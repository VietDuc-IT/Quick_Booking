import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaXmark, FaBars, FaSun, FaMoon } from 'react-icons/fa6';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, Dropdown } from 'flowbite-react';
import { toggleTheme } from '~/redux/theme/themeSlice';
import { signOutSuccess } from '~/redux/user/userSlice';
import { httpRequest } from '~/ultils/httpRequest';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);
    let axiosJWT = httpRequest(currentUser, dispatch);

    // set toggle Menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (Window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.addEventListener('scroll', handleScroll);
        };
    });

    const handleSignout = async () => {
        try {
            const res = await axiosJWT.post('/auth/logout', '', {
                headers: { token: `bearer ${currentUser.accessToken}` },
                withCredentials: true,
            });
            dispatch(signOutSuccess(res.data));
            window.location = '/';
        } catch (err) {
            console.log(err.message);
        }
    };

    // Navitems array
    const navItems = [
        { link: 'Trang chủ', path: '/' },
        { link: 'Thuê nhà', path: '/rent' },
        { link: 'Giới thiệu', path: '/about' },
    ];
    return (
        <header className="w-full bg-white dark:bg-d_main fixed top-0 left-0 right-0 border-b border-gray-200 dark:border-slate-500">
            <nav className={`py-3 lg:px-14 px-4 ${isSticky ? 'sticky top-0 left-0 right-0' : ''}`}>
                <div className="flex justify-between items-center text-base gap-8">
                    {/* ================== LOGO ================= */}
                    <a href="/" className="text-2xl font-semibold flex items-center space-x-3">
                        <span className="text-primary text-4xl">
                            Quick <span className="text-m_text dark:text-d_text text-3xl">Booking</span>
                        </span>
                    </a>

                    {/* ================== NAV ITEMS ================= */}
                    <ul className="md:flex space-x-12 hidden">
                        {navItems.map(({ link, path }) => (
                            <Link
                                to={path}
                                spy={true}
                                smooth={true}
                                offset={-100}
                                key={path}
                                className="block text-base font-medium text-m_text dark:text-d_text hover:text-primary dark:hover:text-primary first:font-medium"
                            >
                                {link}
                            </Link>
                        ))}
                    </ul>

                    {/* ================== SEARCH ================= */}
                    <div className="space-x-5 hidden xl:flex items-center">
                        <div className="relative">
                            <span className="absolute inset-y-0 flex items-center pl-2 mx-auto">
                                <button type="submit" title="Search" className="p-1 focus:outline-none focus:ring">
                                    <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-m_text">
                                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                    </svg>
                                </button>
                            </span>
                            <input
                                type="search"
                                name="Search"
                                placeholder="Tìm kiếm ..."
                                className="w-full py-2 pl-12 text-sm font-medium rounded-full sm:w-96 focus:outline-none text-gray-900 dark:bg-d_text dark:text-m_text "
                            />
                        </div>
                    </div>

                    {/* ================== SEARCH MOBILE ================= */}
                    <div className="relative hidden md:flex xl:hidden">
                        <button className="px-4 py-2 flex space-x-2 bg-white hover:bg-green-500 hover:text-white text-gray-900 text-sm font-medium transition-all duration-300 rounded-full border border-gray-300">
                            <svg
                                fill="currentColor"
                                viewBox="0 0 512 512"
                                className="mt-0.5 w-4 h-4 dark:text-gray-100"
                            >
                                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                            </svg>
                            <span>Tìm kiếm</span>
                        </button>
                    </div>

                    {/* ================== BUTTON =================  */}

                    <div className="space-x-5 hidden md:flex items-center">
                        {/* ================== MOON ================= */}
                        <div class="w-fit">
                            <Button
                                className="w-12 h10 hidden sm:inline"
                                color="gray"
                                pill
                                onClick={() => dispatch(toggleTheme())}
                            >
                                {theme === 'light' ? <FaSun /> : <FaMoon />}
                            </Button>
                        </div>
                        {/* ================== Bell Notification ================= */}
                        <button class="inline-block relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                class="text-gray-600 w-6 h-6 hover:text-gray-900 dark:hover:text-gray-300"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                            </svg>
                            {/* <span class="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-green-400 bg-green-600"></span> */}
                        </button>
                        {/* ================== BTN LOGIN-OUT ================= */}
                        {currentUser ? (
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">
                                        Xin chào <span className="font-semibold">{currentUser.username}</span>
                                    </span>
                                    <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                                </Dropdown.Header>

                                {(currentUser.role === 'Admin' || currentUser.role === 'User') && (
                                    <Link to={'/dashboard'}>
                                        <Dropdown.Item>Hệ thống</Dropdown.Item>
                                    </Link>
                                )}

                                {currentUser.role === 'Customer' && (
                                    <>
                                        <Link to={'/infor'}>
                                            <Dropdown.Item>Trang cá nhân</Dropdown.Item>
                                        </Link>

                                        <Link to={'/'}>
                                            <Dropdown.Item>Lịch sử</Dropdown.Item>
                                        </Link>
                                    </>
                                )}

                                <Link to={'/'}>
                                    <Dropdown.Item>Lưu trữ</Dropdown.Item>
                                </Link>

                                <Link to={'/'}>
                                    <Dropdown.Item>Điều khoản</Dropdown.Item>
                                </Link>

                                <Dropdown.Divider />

                                <Dropdown.Item onClick={handleSignout}>Đăng xuất</Dropdown.Item>
                            </Dropdown>
                        ) : (
                            <>
                                <div className="space-x-5">
                                    <Link
                                        to={'sign-in'}
                                        className="px-4 py-2 text-sm font-medium border-green-400 text-green-500 hover:shadow-sm hover:shadow-green-500 dark:hover:shadow-md dark:hover:shadow-green-500 cursor-pointer rounded border-2"
                                    >
                                        Đăng nhập
                                    </Link>
                                    <Link to={'sign-up'}>
                                        <button className="py-2 px-4 text-sm font-medium bg-green-500 hover:bg-green-600 text-white transition-all duration-300 rounded">
                                            Đăng ký
                                        </button>
                                    </Link>
                                </div>
                            </>
                        )}

                        {/* ================== MENU MOBILE ================= */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="text-neutralDGrey focus:outline-none focus:text-gray-500"
                            >
                                {isMenuOpen ? <FaXmark className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>

                    {/* ================== BTN MOBILE ================= */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-neutralDGrey focus:outline-none focus:text-gray-500"
                        >
                            {isMenuOpen ? <FaXmark className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* ================== NAV MOBILE ================= */}
                <div
                    className={`space-y-4 px-4 mt-16 py-7 bg-green-500 ${
                        isMenuOpen ? 'block fixed top-0 right-0 left-0' : 'hidden'
                    }`}
                >
                    {/* ================== NAV ITEMS ================= */}
                    {navItems.map(({ link, path }) => (
                        <Link
                            to={path}
                            spy={true}
                            smooth={true}
                            offset={-100}
                            key={path}
                            className="block text-base text-gray-900 hover:text-brandPrimary hover:border hover:rounded-lg hover:border-gray-500 first:font-medium"
                        >
                            {link}
                        </Link>
                    ))}

                    {/* ================== SEARCH ================= */}
                    <div className="space-x-5 items-center max-w-65">
                        <div className="relative">
                            <span className="absolute inset-y-0 flex items-center pl-2 mx-auto">
                                <button type="submit" title="Search" className="p-1 focus:outline-none focus:ring">
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 512 512"
                                        className="w-4 h-4 dark:text-gray-100"
                                    >
                                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                    </svg>
                                </button>
                            </span>
                            <input
                                type="search"
                                name="Search"
                                placeholder="Search..."
                                className="w-full py-2 pl-12 text-sm font-medium rounded-full sm:w-96 focus:outline-none text-gray-900 dark:bg-green-500 dark:text-gray-100 focus:dark:bg-green-500"
                            />
                        </div>
                    </div>

                    {/* ================== BUTTON ================= */}
                    <div className="space-x-3">
                        <Link
                            to={'sign-in'}
                            className="px-4 py-2 text-sm font-medium border-white text-white rounded-lg border-2"
                        >
                            Đăng nhập
                        </Link>
                        <Link to={'sign-up'}>
                            <button className="py-2 px-4 text-sm font-medium bg-white text-green-500 transition-all duration-300 rounded-lg">
                                Đăng ký
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
