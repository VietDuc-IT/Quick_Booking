import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DarkMode from '../DarkMode';
import Button from '../Button';
import { FaXmark } from 'react-icons/fa6';
import { FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { currentUser } from '~/redux/selectors';
import Search from '../Search';
import AvatarUser from '../Avatar';

function Header() {
    const User = useSelector(currentUser);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [nav, setNav] = useState('/');
    const [isSticky, setIsSticky] = useState(false);

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
        { link: 'Trang chủ', path: '/' },
        { link: 'Cho thuê', path: '/rent' },
        // { link: 'Môi giới', path: '/renter' },
        // { link: 'Giới thiệu', path: '/about' },
    ];
    return (
        <>
            <header className="py-3 px-5 fixed top-0 left-0 right-0 z-50 text-textmoon bg-m_main dark:bg-d_main border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-[1340px] mx-auto flex justify-between items-center">
                    {/* ================== LOGO ================= */}
                    <div>
                        <Link to="/" className="text-2xl font-semibold">
                            <span className="text-primary-default text-3xl">Quick</span> Booking
                        </Link>
                    </div>

                    {/* ================== Menu nav ================= */}
                    <ul className="space-x-7 max-lg:hidden">
                        {navItems.map(({ link, path }) => (
                            <Link
                                to={path}
                                spy={true}
                                smooth={true}
                                offset={-100}
                                key={path}
                                className={`text-sm font-semibold hover:text-primary-default ${
                                    nav === path && 'text-primary-default'
                                }`}
                                onClick={() => setNav(path)}
                            >
                                {link}
                            </Link>
                        ))}
                    </ul>

                    <div className="flex items-center space-x-7">
                        {/* ================== Theme ================= */}
                        <DarkMode />

                        {/* ================== Button ================= */}
                        <div className="flex items-center space-x-3 max-lg:hidden">
                            {User ? (
                                <AvatarUser />
                            ) : (
                                <>
                                    <Button btn="outline" to="sign-in">
                                        Đăng nhập
                                    </Button>
                                    <Button btn="primary" to="sign-up">
                                        Đăng ký
                                    </Button>
                                    <Button btn="dark" to="sign-in">
                                        Đăng tin
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* ================== Open Mobile ================= */}
                        <button onClick={toggleMenu} className="lg:hidden">
                            {isMenuOpen ? <FaXmark className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                        </button>
                    </div>
                    {/* ================== NAV MOBILE ================= */}
                    <div
                        className={`space-y-4 mt-[61px] p-7 fixed top-0 right-0 left-0 lg:hidden bg-d_body dark:bg-bodydark ${
                            !isMenuOpen && 'hidden'
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
                                className={`block text-sm font-semibold hover:text-primary-default ${
                                    nav === path && 'text-primary-default'
                                }`}
                                onClick={() => setNav(path)}
                            >
                                {link}
                            </Link>
                        ))}

                        {/* ================== BUTTON ================= */}
                        <div className="space-y-5">
                            <Button btn="outline" to="sign-in" className="">
                                Đăng nhập
                            </Button>
                            <Button btn="primary" to="sign-up" className="">
                                Đăng ký
                            </Button>
                            <Button btn="dark" to="sign-in" className="">
                                Đăng tin
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
