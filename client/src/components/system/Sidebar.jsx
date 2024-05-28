import { ImNewspaper } from 'react-icons/im';
import { FaChartPie, FaUser, FaFileInvoice, FaUsers, FaHouseUser } from 'react-icons/fa';
import { BsHouseGearFill } from 'react-icons/bs';
import { IoMdHelpCircle } from 'react-icons/io';
import { IoDocumentText } from 'react-icons/io5';
import { FaCommentDots } from 'react-icons/fa6';
import { HiBellAlert } from 'react-icons/hi2';
import { MdDisplaySettings } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutSuccess } from '~/redux/user/userSlice';
import { httpRequest } from '~/ultils/httpRequest';

import { useState } from 'react';

function Sidebar() {
    const { currentUser } = useSelector((state) => state.user);
    const [activePage, setActivePage] = useState();
    const dispatch = useDispatch();
    let axiosJWT = httpRequest(currentUser, dispatch);

    const handleSignout = async () => {
        try {
            const res = await axiosJWT.post('/auth/logout', '', {
                headers: { token: `bearer ${currentUser.accessToken}` },
                withCredentials: true,
            });
            dispatch(signOutSuccess(res.data));
        } catch (err) {
            console.log(err.message);
        }
    };
    const menu = [
        { href: '/dashboard', icon: FaChartPie, name: 'Thống kê' },
        { href: '/posts', icon: BsHouseGearFill, name: 'Bài đăng' },
        { href: '/create-post', icon: ImNewspaper, name: 'Đăng tin' },
        { href: '/bill', icon: FaFileInvoice, name: 'Hóa đơn' },
        { href: '/comment', icon: FaCommentDots, name: 'Bình luận' },
    ];
    if (currentUser.role === 'Admin') {
        menu.push(
            { href: '/user', icon: FaUsers, name: 'Người dùng' },
            { href: '/host', icon: FaHouseUser, name: 'Môi giới' },
            { href: '/category', icon: MdDisplaySettings, name: 'Danh mục' },
        );
    }
    return (
        <div>
            <button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            {/* ======================= SIDEBAR ========================== */}
            <aside
                id="default-sidebar"
                // className="fixed top-0 left-0 z-9999 w-64 mt-4 transition-transform -translate-x-full sm:translate-x-0"
                className={`absolute left-0 top-0 z-9999 flex h-screen w-64 flex-col overflow-y-hidden duration-300 ease-linear lg:static sm:translate-x-0 `}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-d_main">
                    {/* ======================== Logo ====================== */}
                    <a href="/" className="flex items-center ps-2.5 mb-5">
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            <span className="text-primary-default">
                                Quick <span className="text-m_text dark:text-d_text">Booking</span>
                            </span>
                        </span>
                    </a>

                    <div className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700" />
                    {/* ================================== Action ================================ */}
                    <ul className="space-y-2 font-medium">
                        {menu.map((item) => (
                            <li key={item.id}>
                                <Link
                                    to={item.href}
                                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group ${
                                        activePage === item.href ? 'bg-gray-300 dark:bg-gray-700 group' : ''
                                    }`}
                                    onClick={() => setActivePage(item.href)}
                                >
                                    <item.icon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700" />
                    <ul className="space-y-2 font-medium">
                        {/* ======================= Profile ======================= */}
                        <li>
                            <Link
                                to="/profile"
                                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group ${
                                    activePage === 'profile' ? 'bg-gray-300 dark:bg-gray-700 group' : ''
                                }`}
                                onClick={() => setActivePage('profile')}
                            >
                                <FaUser className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                                <span className="flex-1 ms-3 whitespace-nowrap">Cá nhân</span>
                                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                    {`${currentUser.role}`}
                                </span>
                            </Link>
                        </li>
                        {/* ======================= Notification ======================= */}
                        <li>
                            <Link
                                to="/notification"
                                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group ${
                                    activePage === 'notification' ? 'bg-gray-300 dark:bg-gray-700 group' : ''
                                }`}
                                onClick={() => setActivePage('notification')}
                            >
                                <HiBellAlert className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                                <span className="flex-1 ms-3 whitespace-nowrap">Thông báo</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                    3
                                </span>
                            </Link>
                        </li>
                        {/* ======================= Help ======================= */}
                        <li>
                            <Link
                                to="/help"
                                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group ${
                                    activePage === 'help' ? 'bg-gray-300 dark:bg-gray-700 group' : ''
                                }`}
                                onClick={() => setActivePage('help')}
                            >
                                <IoMdHelpCircle className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                                <span className="flex-1 ms-3 whitespace-nowrap">Trợ giúp</span>
                            </Link>
                        </li>
                        {/* ======================= Document ======================= */}
                        <li>
                            <Link
                                to="/document"
                                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group ${
                                    activePage === 'document' ? 'bg-gray-300 dark:bg-gray-700 group' : ''
                                }`}
                                onClick={() => setActivePage('document')}
                            >
                                <IoDocumentText className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                                <span className="flex-1 ms-3 whitespace-nowrap">Tài liệu</span>
                            </Link>
                        </li>
                        {/* ======================= Sign Out ======================= */}
                        <li>
                            <Link
                                onClick={handleSignout}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                                    />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Đăng xuất</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default Sidebar;
