import { TextInput } from 'flowbite-react';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { HiMail, HiPhone } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { currentUser } from '~/redux/selectors';

import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { app } from '~/ultils/firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';
import FaceDetection from '~/faceDetection/FaceDetection';

function RenterLogin() {
    const User = useSelector(currentUser);
    const axiosPrivate = useAxiosPrivate();
    const [formData, setFormData] = useState({
        phoneNumber: '',
        cccdtruocUrl: '',
        cccdsauUrl: '',
        faceUrl: '',
    });
    const [uploading, setUploading] = useState(false);
    const [isFaceDetectionVisible, setIsFaceDetectionVisible] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleImageSubmit = async (e) => {
        const { files, id } = e.target;
        if (!files.length) return;

        setUploading(true);

        try {
            const url = await storeImage(files[0]); // Assuming storeImage returns a single URL

            if (id === 'cccdtruoc') {
                setFormData((prevData) => ({
                    ...prevData,
                    cccdtruocUrl: url,
                }));
                toast.success('Tải CCCD mặt trước thành công.');
            } else if (id === 'cccdsau') {
                setFormData((prevData) => ({
                    ...prevData,
                    cccdsauUrl: url,
                }));
                toast.success('Tải CCCD mặt sau thành công.');
            } else if (id === 'face') {
                setFormData((prevData) => ({
                    ...prevData,
                    faceUrl: url,
                }));
                toast.success('Tải ảnh chân dung thành công.');
            }

            setUploading(false);
        } catch (err) {
            toast.error('Tải ảnh thất bại (mỗi ảnh tối đa 2mb)!');
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                },
            );
        });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const valid = () => {
        if (
            formData.phoneNumber === '' ||
            formData.cccdtruocUrl === '' ||
            formData.cccdsauUrl === '' ||
            formData.faceUrl === ''
        ) {
            toast.error('Bạn không được bỏ trống!');
            return false;
        }

        if (formData.phoneNumber.length !== 10) {
            toast.error('Số điện thoại không hợp lệ!');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (valid()) {
            try {
                const res = await axiosPrivate.put(`/api/renter/sign/${User._id}`, formData, {
                    headers: { token: `bearer ${User.accessToken}` },
                });

                toast.success(res.data.message);
                setLoading(false);
            } catch (err) {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
            }
        }
    };

    return (
        <>
            <div className="">
                <div className="p-5 max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 bg-m_main dark:bg-d_main">
                        {isFaceDetectionVisible ? (
                            <div className="flex flex-col items-center justify-center space-y-5 p-4">
                                <p class="text-lg font-medium text-gray-900 dark:text-white">
                                    Quy định đăng tin trên Quick Booking
                                </p>
                                <h4>
                                    <span className="font-semibold text-gray-900 underline dark:text-white decoration-indigo-500">
                                        Đối tượng Người dùng:
                                    </span>{' '}
                                    Chợ Tốt có quyền quyết định một Tin đăng có phải là Tin đăng Bán chuyên/Môi giới hay
                                    tin đăng Cá nhân.
                                </h4>
                                <p>
                                    <span className="font-semibold text-gray-900 underline dark:text-white decoration-indigo-500">
                                        Cá nhân:
                                    </span>{' '}
                                    Dành cho đối tượng là các Cá nhân có quyền hợp pháp tham gia vào các thoả thuận/hợp
                                    đồng mua bán ở Việt Nam và bán hàng không vì mục đích kinh doanh. Đăng tối đa 3 tin
                                    trong từng chuyên mục.
                                    <br />
                                    <span className="font-semibold text-gray-900 underline dark:text-white decoration-indigo-500">
                                        Bán chuyên/Môi giới:
                                    </span>{' '}
                                    Dành cho đối tượng là những Cá nhân/Tập thể bán hàng với mục đích kinh doanh, bao
                                    gồm các Cửa hàng, Doanh nghiệp và các Hộ gia đình hoặc Cá nhân kinh doanh nhỏ. Đăng
                                    tin không giới hạn từng chuyên mục.
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-900 underline dark:text-white decoration-indigo-500">
                                        Cho phép:
                                    </span>{' '}
                                    Miêu tả chi tiết vị trí, số phòng, diện tích, tên dự án, căn hộ, tên đường, tình
                                    trạng sở hữu, v.v
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-900 underline dark:text-white decoration-indigo-500">
                                        Không cho phép:
                                    </span>{' '}
                                    Theo điều 8 mục 11 của Luật Quảng cáo, không được sử dụng các từ ngữ “nhất”, “duy
                                    nhất”, “tốt nhất”, “số một” hoặc từ ngữ có ý nghĩa tương tự trong nội dung tin đăng
                                    (nếu sử dụng phải có tài liệu chứng minh) Tin rao không nhằm mục đích mua bán Số
                                    điện thoại, các đường dẫn kết nối đến trang khác, email có chứa tên miền website
                                    khác
                                </p>
                            </div>
                        ) : (
                            <FaceDetection />
                        )}

                        <div className="flex items-center justify-center">
                            <form className="container p-5 sm:w-full space-y-7" onSubmit={handleSubmit}>
                                {/* ========= Username ======== */}
                                <TextInput
                                    type="text"
                                    // id="username"
                                    icon={FaUser}
                                    placeholder="username"
                                    defaultValue={User.username}
                                    disabled
                                    // onChange={handleChange}
                                />
                                {/* ========= Email ======== */}
                                <TextInput
                                    // id="email"
                                    type="email"
                                    icon={HiMail}
                                    defaultValue={User.email}
                                    disabled
                                    // onChange={handleChange}
                                />
                                {/* ========= Phone ======== */}
                                <TextInput
                                    id="phoneNumber"
                                    type="text"
                                    icon={HiPhone}
                                    placeholder="Số điện thoại ..."
                                    onChange={handleChange}
                                />

                                {/* CCCD mặt trước */}
                                <div>
                                    <div className="flex">
                                        <div className="w-full">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                CCCD mặt trước
                                            </label>
                                            <input
                                                onChange={handleImageSubmit}
                                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                type="file"
                                                id="cccdtruoc"
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* CCCD mặt sau */}
                                <div className="flex">
                                    <div className="w-full">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            CCCD mặt sau
                                        </label>
                                        <input
                                            onChange={handleImageSubmit}
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            type="file"
                                            id="cccdsau"
                                            accept="image/*"
                                        />
                                    </div>
                                </div>

                                {/* Ảnh chân dung của bạn */}
                                <div className="flex">
                                    <div className="w-full">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Ảnh chân dung của bạn
                                        </label>
                                        <input
                                            onChange={handleImageSubmit}
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            type="file"
                                            id="face"
                                            accept="image/*"
                                        />
                                    </div>
                                </div>

                                <div className="flex">
                                    <div
                                        className="text-white bg-primary-default hover:bg-primary-hover focus:ring-4 focus:ring-primary3 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 w-full flex justify-center cursor-pointer"
                                        // to="/face"
                                        onClick={() => setIsFaceDetectionVisible(!isFaceDetectionVisible)}
                                    >
                                        Chụp ảnh chân dung
                                    </div>
                                </div>

                                <div className="flex justify-center space-x-3">
                                    {!loading ? (
                                        <button
                                            type="submit"
                                            className="text-white bg-primary-default hover:bg-primary-hover focus:ring-4 focus:ring-primary3 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 w-1/4"
                                        >
                                            Đăng ký
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="text-white bg-primary-default hover:bg-primary-hover focus:ring-4 focus:ring-primary3 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 w-1/4"
                                        >
                                            Đang xử lý ...
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RenterLogin;
