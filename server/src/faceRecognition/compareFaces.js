const faceapi = require("face-api.js");
const canvas = require("canvas");
const fetch = require("node-fetch");
const { Canvas, Image, ImageData } = canvas;

// Cần thiết để sử dụng face-api.js với Node.js
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Tải các mô hình cần thiết
const MODEL_URL = "./src/faceRecognition/models"; // Thay thế bằng đường dẫn đến thư mục chứa các mô hình đã tải về

const loadModels = async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);
};

// Hàm tải hình ảnh từ URL và chuyển đổi thành đối tượng Canvas
const fetchImage = async (url) => {
  const response = await fetch(url);
  const buffer = await response.buffer();
  const img = new Image();
  img.src = buffer;
  const cnv = canvas.createCanvas(img.width, img.height);
  const ctx = cnv.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  return cnv;
};

// Hàm so sánh khuôn mặt
export const compareFaces = async (sourceImageUrl, targetImageUrl) => {
  try {
    await loadModels();
    // Tải hình ảnh
    const sourceImage = await fetchImage(sourceImageUrl);
    const targetImage = await fetchImage(targetImageUrl);

    // Phát hiện khuôn mặt và tính toán mô tả khuôn mặt
    const [sourceResult] = await faceapi
      .detectAllFaces(sourceImage)
      .withFaceLandmarks()
      .withFaceDescriptors();
    const [targetResult] = await faceapi
      .detectAllFaces(targetImage)
      .withFaceLandmarks()
      .withFaceDescriptors();

    if (!sourceResult || !targetResult) {
      return null;
    }

    // So sánh các mô tả khuôn mặt
    const distance = faceapi.euclideanDistance(
      sourceResult.descriptor,
      targetResult.descriptor
    );
    // const similarity = (1 - distance) * 100 + 35;
    const similarity = Math.min((1 - distance) * 100 + 40, 99.9888888);

    console.log("Độ tương đồng của khuôn mặt:", similarity);
    return similarity;
  } catch (error) {
    console.error("Lỗi khi so sánh khuôn mặt:", error);
    throw error;
  }
};
