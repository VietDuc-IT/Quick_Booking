import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// react icons
import { FaXmark, FaBars } from 'react-icons/fa6';
import { Button, Navbar } from 'flowbite-react';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    // const path = useLocation().pathname;
    // const location = useLocation();

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
    // Navitems array

    const navItems = [
        { link: 'Home', path: '/' },
        { link: 'Rent', path: '/rent' },
        { link: 'About', path: '/about' },
    ];
    return (
        <>
            <header className="w-full z-50 bg-white fixed top-0 left-0 right-0 border-b border-gray-200">
                <nav className={`py-3 lg:px-14 px-4 ${isSticky ? 'sticky top-0 left-0 right-0 bg-white' : ''}`}>
                    <div className="flex justify-between items-center text-base gap-8">
                        {/* ================== LOGO ================= */}
                        <a href="/" className="text-2xl font-semibold flex items-center space-x-3">
                            <span className="text-[#263238] text-4xl">
                                Quick <span className="text-green-500 text-3xl">Booking</span>
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
                                    className="block text-base font-medium text-gray-900 hover:text-green-500 first:font-medium"
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
                                <span>Search</span>
                            </button>
                        </div>

                        {/* ================== BUTTON =================  */}

                        <div className="space-x-5 hidden md:flex items-center">
                            {/* ================== MOON ================= */}
                            <div class="w-fit">
                                <button class="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        stroke-width="0"
                                        viewBox="0 0 20 20"
                                        aria-hidden="true"
                                        aria-label="Currently dark mode"
                                        data-active="false"
                                        class="h-5 w-5 hidden dark:block"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        stroke-width="0"
                                        viewBox="0 0 20 20"
                                        aria-hidden="true"
                                        aria-label="Currently light mode"
                                        data-active="true"
                                        class="h-5 w-5 dark:hidden"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                    </svg>
                                </button>
                            </div>
                            {/* ================== BTN LOGIN-OUT ================= */}
                            <div className="space-x-5">
                                <Link
                                    to={'sign-in'}
                                    className="px-4 py-2 text-sm font-medium border-green-500 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer rounded border-2"
                                >
                                    Login
                                </Link>
                                <Link to={'sign-up'}>
                                    <button className="py-2 px-4 text-sm font-medium bg-green-500 hover:bg-green-600 text-white transition-all duration-300 rounded">
                                        Sign up
                                    </button>
                                </Link>
                            </div>

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
                                Login
                            </Link>
                            <Link to={'sign-up'}>
                                <button className="py-2 px-4 text-sm font-medium bg-white text-green-500 transition-all duration-300 rounded-lg">
                                    Sign up
                                </button>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;
