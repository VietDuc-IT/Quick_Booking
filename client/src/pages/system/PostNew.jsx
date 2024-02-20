import { Link } from 'react-router-dom';
import { MdDriveFolderUpload } from 'react-icons/md';
import { TbHomeDollar } from 'react-icons/tb';
import { useState } from 'react';

function PostNew() {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    const handleRefresh = () => {};
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
                                Home
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
                                    Post New
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div class="flex items-center justify-center bg-m_main dark:bg-d_main">
                <form className="container p-5 sm:w-full" onSubmit={handleSubmit}>
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
                    {/* ================== Price ==================== */}
                    <div class="mb-6 w-1/2">
                        <label for="message" class="block mb-2 text-sm font-medium">
                            Giá
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
                    {/* ================== Image ==================== */}
                    <div class="mb-6 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 flex">
                        <div className="w-full">
                            <label
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                for="multiple_files"
                            >
                                Ảnh
                            </label>
                            <input
                                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                id="images"
                                type="file"
                                onChange={handleChange}
                                multiple
                            />
                        </div>
                        <button
                            type="button"
                            className="text-sm px-5 py-2.5 text-center inline-flex items-center me-2 font-medium border-green-400 text-green-500 hover:shadow-sm hover:shadow-green-500 dark:hover:shadow-md dark:hover:shadow-green-500 cursor-pointer rounded border-2 h-10 mt-7 ml-3 w-32"
                        >
                            <MdDriveFolderUpload class="w-4 h-4 me-2" />
                            Tải lên
                        </button>
                    </div>
                    <div className="flex justify-center space-x-3">
                        <button
                            type="submit"
                            class="text-white bg-primary hover:bg-primary6 focus:ring-4 focus:ring-primary3 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-primary dark:hover:bg-primary6 focus:outline-none dark:focus:ring-primary7 w-1/4"
                        >
                            Đăng tin
                        </button>
                        <div class="py-2.5 px-5 me-2 mb-2 text-base font-medium text-center cursor-pointer w-1/4 text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Làm mới
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default PostNew;
