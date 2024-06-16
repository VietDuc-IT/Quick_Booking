import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

function FaceDetection() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedPhotoUrl, setCapturedPhotoUrl] = useState(null);
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [count, setCount] = useState(null);
    const [openCount, setOpenCount] = useState(false);
    let smileDetectedTime = null;
    let intervalId = null;

    useEffect(() => {
        if (isVideoVisible) {
            startVideo();
            videoRef.current && loadModels();
        }

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            }
            clearInterval(intervalId);
        };
    }, [isVideoVisible]);

    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((currentStream) => {
                videoRef.current.srcObject = currentStream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play();
                    faceMyDetect();
                };
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const loadModels = () => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ]).then(() => {
            console.log('Models loaded');
        });
    };

    const faceMyDetect = () => {
        const startTimer = () => {
            smileDetectedTime = Date.now();
            intervalId = setInterval(() => {
                const elapsedTime = Date.now() - smileDetectedTime;
                if (elapsedTime >= 3000) {
                    clearInterval(intervalId);
                    setOpenCount(true);
                    setCount(3);
                }
            }, 100);
        };

        const detectIntervalId = setInterval(async () => {
            if (!videoRef.current) return;

            const detections = await faceapi
                .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();

            if (!canvasRef.current) return;

            canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
            faceapi.matchDimensions(canvasRef.current, {
                width: videoRef.current.videoWidth,
                height: videoRef.current.videoHeight,
            });

            const resized = faceapi.resizeResults(detections, {
                width: videoRef.current.videoWidth,
                height: videoRef.current.videoHeight,
            });

            faceapi.draw.drawDetections(canvasRef.current, resized);
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
            faceapi.draw.drawFaceExpressions(canvasRef.current, resized);

            resized.forEach((detection) => {
                const expressions = detection.expressions;
                if (expressions.happy > 0.5 && !smileDetectedTime) {
                    startTimer();
                }
            });
        }, 1000);

        return () => clearInterval(detectIntervalId);
    };

    const capturePhoto = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL('image/png');
        setCapturedPhotoUrl(dataUrl);

        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'captured_image.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        }
        setIsVideoVisible(false);
    };

    useEffect(() => {
        if (count === 0) {
            setOpenCount(false);
            capturePhoto();
        } else if (count > 0) {
            const timerId = setTimeout(() => {
                setCount(count - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }
    }, [count]);

    return (
        <div className="flex flex-col items-center justify-center">
            <p className="p-2 font-medium">Nhận diện khuôn mặt (Sau 3 giây bạn cười ảnh sẽ tự động được chụp lại)</p>
            {openCount && (
                <>
                    <p>Đếm ngược: {count} giây</p>
                </>
            )}
            {isVideoVisible && (
                <div className="flex items-center">
                    <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
                    <canvas ref={canvasRef} width="940" height="650" className="absolute top-[100px]" />
                </div>
            )}

            {capturedPhotoUrl ? (
                <div className="mt-4 w-full flex justify-center">
                    <button
                        className="text-white bg-primary-default hover:bg-primary-hover focus:ring-4 focus:ring-primary3 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 w-1/4"
                        onClick={() => setIsVideoVisible(true)}
                    >
                        Chụp lại
                    </button>
                </div>
            ) : (
                <div className="mt-4 w-full flex justify-center">
                    <button
                        className="text-white bg-primary-default hover:bg-primary-hover focus:ring-4 focus:ring-primary3 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 w-1/4"
                        onClick={() => setIsVideoVisible(true)}
                    >
                        Bắt đầu
                    </button>
                </div>
            )}

            {capturedPhotoUrl && (
                <>
                    <div className="mt-2">
                        <div className="flex items-center justify-center">
                            <h2>Ảnh đã chụp</h2>
                        </div>
                        <img src={capturedPhotoUrl} alt="Captured" style={{ maxWidth: '100%' }} />
                    </div>
                </>
            )}
        </div>
    );
}

export default FaceDetection;
