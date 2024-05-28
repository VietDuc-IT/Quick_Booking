import { TextInput } from 'flowbite-react';
import { useRef } from 'react';
import { FaUser } from 'react-icons/fa';
import { HiMail, HiPhone } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { currentUser } from '~/redux/selectors';
import DropDown from '~/components/DropDown';

function RenterLogin() {
    const User = useSelector(currentUser);
    const inputRef = useRef();

    const areaList = ['Thủ Đức', 'Quận 1', 'Quận 2', 'Quận 3'];

    const handleChange = () => {};

    const handleSubmit = () => {};
    return (
        <>
            <div className="">
                <div className="p-5 max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 bg-m_main dark:bg-d_main">
                        <div className="flex flex-col items-center justify-center space-y-5 p-4">
                            <p class="text-lg font-medium text-gray-900 dark:text-white">
                                Quy định đăng tin trên Quick Booking
                            </p>
                            <h4>
                                <span className="font-semibold text-gray-900 underline dark:text-white decoration-indigo-500">
                                    Đối tượng Người dùng:
                                </span>{' '}
                                Chợ Tốt có quyền quyết định một Tin đăng có phải là Tin đăng Bán chuyên/Môi giới hay tin
                                đăng Cá nhân.
                            </h4>
                            <p>
                                <span className="font-semibold text-gray-900 underline dark:text-white decoration-indigo-500">
                                    Cá nhân:
                                </span>{' '}
                                Dành cho đối tượng là các Cá nhân có quyền hợp pháp tham gia vào các thoả thuận/hợp đồng
                                mua bán ở Việt Nam và bán hàng không vì mục đích kinh doanh. Đăng tối đa 3 tin trong
                                từng chuyên mục.
                                <br />
                                <span className="font-semibold text-gray-900 underline dark:text-white decoration-indigo-500">
                                    Bán chuyên/Môi giới:
                                </span>{' '}
                                Dành cho đối tượng là những Cá nhân/Tập thể bán hàng với mục đích kinh doanh, bao gồm
                                các Cửa hàng, Doanh nghiệp và các Hộ gia đình hoặc Cá nhân kinh doanh nhỏ. Đăng tin
                                không giới hạn từng chuyên mục.
                            </p>
                            <p>
                                <span className="font-semibold text-gray-900 underline dark:text-white decoration-indigo-500">
                                    Cho phép:
                                </span>{' '}
                                Miêu tả chi tiết vị trí, số phòng, diện tích, tên dự án, căn hộ, tên đường, tình trạng
                                sở hữu, v.v
                            </p>
                            <p>
                                <span className="font-semibold text-gray-900 underline dark:text-white decoration-indigo-500">
                                    Không cho phép:
                                </span>{' '}
                                Theo điều 8 mục 11 của Luật Quảng cáo, không được sử dụng các từ ngữ “nhất”, “duy nhất”,
                                “tốt nhất”, “số một” hoặc từ ngữ có ý nghĩa tương tự trong nội dung tin đăng (nếu sử
                                dụng phải có tài liệu chứng minh) Tin rao không nhằm mục đích mua bán Số điện thoại, các
                                đường dẫn kết nối đến trang khác, email có chứa tên miền website khác
                            </p>
                        </div>
                        <div className="flex items-center justify-center">
                            <form className="container p-5 sm:w-full space-y-7" onSubmit={handleSubmit} ref={inputRef}>
                                {/* ========= Username ======== */}
                                <TextInput
                                    type="text"
                                    id="username"
                                    icon={FaUser}
                                    placeholder="username"
                                    defaultValue={User.username}
                                    onChange={handleChange}
                                />
                                {/* ========= Email ======== */}
                                <TextInput
                                    id="email"
                                    type="email"
                                    icon={HiMail}
                                    defaultValue={User.email}
                                    onChange={handleChange}
                                />
                                {/* ========= Phone ======== */}
                                <TextInput
                                    id="phone"
                                    type="text"
                                    icon={HiPhone}
                                    defaultValue={User.phoneNumber}
                                    onChange={handleChange}
                                />
                                {/* ========= Area ======== */}
                                <DropDown name={'Chọn khu vực'} list={areaList} />

                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        for="file_input"
                                    >
                                        CCCD mặt trước
                                    </label>
                                    <input
                                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="file_input"
                                        type="file"
                                    />
                                </div>

                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        for="file_input"
                                    >
                                        CCCD mặt sau
                                    </label>
                                    <input
                                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="file_input"
                                        type="file"
                                    />
                                </div>

                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        for="file_input"
                                    >
                                        Ảnh chân dung của bạn
                                    </label>
                                    <input
                                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="file_input"
                                        type="file"
                                    />
                                </div>

                                <button
                                    type="button"
                                    class="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-default focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    Xác thực bằng khuôn mặt
                                </button>

                                <div className="flex justify-center space-x-3">
                                    <button
                                        type="submit"
                                        className="text-white bg-primary-default hover:bg-primary-hover focus:ring-4 focus:ring-primary3 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 w-1/4"
                                    >
                                        Đăng ký
                                    </button>
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
