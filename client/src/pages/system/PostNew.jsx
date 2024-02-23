import { Link, useNavigate } from 'react-router-dom';
import { MdDriveFolderUpload } from 'react-icons/md';
import { TbHomeDollar } from 'react-icons/tb';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { httpRequest } from '~/ultils/httpRequest';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '~/ultils/firebase';
import { toast } from 'react-toastify';

function PostNew() {
    const { currentUser } = useSelector((state) => state.user);
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        address: '',
        description: '',
        category: '',
        price: null,
        imageUrls: [],
    });
    const [uploading, setUploading] = useState(false);
    const [checkedValue, setCheckedValue] = useState('');
    const inputRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = httpRequest(currentUser, dispatch);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleCheckbox = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setCheckedValue(value);
            setFormData({
                ...formData,
                category: value,
            });
        } else {
            setCheckedValue('');
            setFormData({
                ...formData,
                category: '',
            });
        }
    };

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises)
                .then((urls) => {
                    setFormData({
                        ...formData,
                        imageUrls: formData.imageUrls.concat(urls),
                    });
                    setUploading(false);
                })
                .catch((err) => {
                    toast.error('Tải ảnh thất bại (mỗi ảnh tối đa 2mb)!');
                    setUploading(false);
                });
        } else {
            toast.error('Bạn chỉ có thể tải tối đa 6 ảnh!');
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

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (
                formData.title === '' ||
                formData.description === '' ||
                formData.address === '' ||
                formData.price === null
            )
                return toast.error('Bạn cần điền đủ các thông tin!');
            if (formData.category === '') return toast.error('Bạn phải chọn loại hình cho thuê!');
            if (formData.imageUrls.length < 1) return toast.error('Bạn phải có ít nhất 1 ảnh!');

            await axiosJWT.post('/post', formData, {
                headers: { token: `bearer ${currentUser.accessToken}` },
            });

            toast.success('Đăng tin thành công!');
            navigate('/news');
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleRefresh = () => {
        inputRef.current.reset();
        setCheckedValue('');
        setFormData({
            title: '',
            address: '',
            description: '',
            category: '',
            price: null,
            imageUrls: [],
        });
    };

    return (
        <>
            <div className="mb-3 flex justify-end">
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li class="inline-flex items-center">
                            <Link
                                to="/dashboard"
                                class="inline-flex items-center text-sm font-medium hover:text-primary dark:text-d_text dark:hover:text-primary"
                            >
                                <svg
                                    class="w-3 h-3 me-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Trang chủ
                            </Link>
                        </li>

                        <li aria-current="page">
                            <div class="flex items-center">
                                <svg
                                    class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                    Đăng tin
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div class="flex items-center justify-center bg-m_main dark:bg-d_main">
                <form className="container p-5 sm:w-full" onSubmit={handleSubmit} ref={inputRef}>
                    {/* ================== Title ==================== */}
                    <div class="mb-6">
                        <label for="default-input" class="block mb-2 text-sm font-medium">
                            Tiêu đề
                        </label>
                        <input
                            type="text"
                            id="title"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                            placeholder="Quick Booking"
                            onChange={handleChange}
                        />
                    </div>
                    {/* ================== Address ==================== */}
                    <div class="mb-6">
                        <label for="default-input" class="block mb-2 text-sm font-medium">
                            Địa chỉ
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                <svg
                                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 16 20"
                                >
                                    <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="address"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                                placeholder="Địa chỉ ..."
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/* ================== Description ==================== */}
                    <div class="mb-6">
                        <label for="message" class="block mb-2 text-sm font-medium">
                            Chi tiết
                        </label>
                        <textarea
                            id="description"
                            rows="4"
                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                            placeholder="Viết mô tả ở đây ..."
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="flex">
                        {/* ================== Category ==================== */}
                        <div class="mb-6 w-1/2">
                            <label for="message" class="block mb-2 text-sm font-medium">
                                Loại hình cho thuê
                            </label>
                            <div class="flex mt-5">
                                <div class="flex items-center me-4">
                                    <input
                                        id="category"
                                        type="checkbox"
                                        value="Nhà ở"
                                        checked={checkedValue === 'Nhà ở'}
                                        onChange={handleCheckbox}
                                        class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        for="inline-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Nhà ở
                                    </label>
                                </div>
                                <div class="flex items-center me-4">
                                    <input
                                        id="category"
                                        type="checkbox"
                                        value="Căn hộ / Chung cư"
                                        checked={checkedValue === 'Căn hộ / Chung cư'}
                                        onChange={handleCheckbox}
                                        class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        for="inline-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Căn hộ / Chung cư
                                    </label>
                                </div>
                                <div class="flex items-center me-4">
                                    <input
                                        id="category"
                                        type="checkbox"
                                        value="Phòng trọ"
                                        checked={checkedValue === 'Phòng trọ'}
                                        onChange={handleCheckbox}
                                        class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        for="inline-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Phòng trọ
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* ================== Price ==================== */}
                        <div class="mb-6 w-1/2">
                            <label for="message" class="block mb-2 text-sm font-medium">
                                Giá <span className="text-gray-400">(VNĐ / tháng)</span>
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                    <TbHomeDollar class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="price"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                                    placeholder="1.000.000 VNĐ"
                                    onChange={handleChange}
                                />
                                <div class="absolute inset-y-0 end-7 -top-2 flex items-center ps-3.5 pointer-events-none">
                                    <p class="w-4 h-4 text-gray-500 dark:text-gray-400">VNĐ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ================== Image ==================== */}
                    <div class="mb-6 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                        <div className="flex">
                            <div className="w-full">
                                <label
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    for="multiple_files"
                                >
                                    Thêm ảnh{' '}
                                    <span className="text-gray-400">(Ảnh đầu tiên sẽ là ảnh bìa, tối đa 6 ảnh)</span>
                                </label>
                                <input
                                    onChange={(e) => setFiles(e.target.files)}
                                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    type="file"
                                    id="images"
                                    accept="image/*"
                                    multiple
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleImageSubmit}
                                className="text-sm px-5 py-2.5 text-center inline-flex items-center me-2 font-medium border-green-400 text-green-500 hover:shadow-sm hover:shadow-green-500 dark:hover:shadow-md dark:hover:shadow-green-500 cursor-pointer rounded border-2 h-10 mt-7 ml-3 w-32"
                            >
                                {uploading ? (
                                    'Đang tải ...'
                                ) : (
                                    <>
                                        <MdDriveFolderUpload class="w-4 h-4 me-2" /> Tải lên
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="grid grid-cols-3">
                            {formData.imageUrls.length > 0 &&
                                formData.imageUrls.map((url, index) => (
                                    <div key={url} className="flex justify-around p-3 m-2 border items-center ">
                                        <img
                                            src={url}
                                            alt="listing image"
                                            className="w-auto h-20 object-contain rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            class="font-medium text-red-500 dark:text-red-500 hover:underline"
                                        >
                                            Xóa ảnh
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="flex justify-center space-x-3">
                        <button
                            type="submit"
                            class="text-white bg-primary hover:bg-primary6 focus:ring-4 focus:ring-primary3 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-primary dark:hover:bg-primary6 focus:outline-none dark:focus:ring-primary7 w-1/4"
                        >
                            Đăng tin
                        </button>
                        <div
                            class="py-2.5 px-5 me-2 mb-2 text-base font-medium text-center cursor-pointer w-1/4 text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={handleRefresh}
                        >
                            Làm mới
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default PostNew;
