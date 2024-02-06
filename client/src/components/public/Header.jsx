import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/images/logo/logo.svg';

// react icons
import { FaXmark, FaBars } from 'react-icons/fa6';

import { AuthData } from '~/authentication/index';
import { nav } from '~/routes';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const { user, logout } = AuthData();

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

    const MenuItem = ({ route }) => {
        return (
            <div className="menuItem">
                <Link to={route.path}>{route.name}</Link>
            </div>
        );
    };
    // Navitems array
    const navItems = [
        { link: 'Home', path: 'home' },
        { link: 'About', path: 'About' },
    ];
    return (
        <>
            <header className="w-full bg-white md:bg-transparent fixed top-0 left-0 right-0">
                <nav
                    className={`py-4 lg:px-14 px-4 ${
                        isSticky ? 'sticky top-0 left-0 right-0 border-b bg-white duration-300' : ''
                    }`}
                >
                    <div className="flex justify-between items-center text-base gap-8">
                        <a href="#" className="text-2xl font-semibold flex items-center space-x-3">
                            <img src={logo} alt="logo" />
                            <span className="text-[#263238]">
                                Quick <span className="text-brandPrimary">Booking</span>
                            </span>
                        </a>

                        {/* nav items for large devices */}
                        <ul className="md:flex space-x-12 hidden">
                            {/* {navItems.map(({ link, path }) => (
                                <Link
                                    to={path}
                                    spy={true}
                                    smooth={true}
                                    offset={-100}
                                    key={path}
                                    className="block text-base text-gray-900 hover:text-brandPrimary first:font-medium"
                                >
                                    {link}
                                </Link>
                            ))} */}
                            {nav.map((route, index) => {
                                if (!route.isAdmin && route.isMenu) {
                                    return <MenuItem key={index} route={route} />;
                                } else if (user.isAuthenticated && route.isMenu) {
                                    return <MenuItem key={index} route={route} />;
                                } else return false;
                            })}
                        </ul>

                        {/* btn for large devices */}
                        <div className="space-x-12 hidden lg:flex items-center">
                            {user.isAuthenticated ? (
                                <div className="menuItem">
                                    <Link to={'#'} onClick={logout}>
                                        <button className="bg-brandPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutralDGrey">
                                            Sign up
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="menuItem">
                                    <Link
                                        to={'login'}
                                        className="hidden lg:flex items-center text-brandPrimary hover:text-gray-900"
                                    >
                                        Login
                                    </Link>
                                </div>
                            )}

                            {/* menu button for only mobile devices */}
                            <div className="md:hidden">
                                <button
                                    onClick={toggleMenu}
                                    className="text-neutralDGrey focus:outline-none focus:text-gray-500"
                                >
                                    {isMenuOpen ? <FaXmark className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* nav items for moblie devices */}
                    <div
                        className={`space-y-4 px-4 mt-16 py-7 bg-brandPrimary ${
                            isMenuOpen ? 'block fixed top-0 right-0 left-0' : 'hidden'
                        }`}
                    >
                        {navItems.map(({ link, path }) => (
                            <Link
                                to={path}
                                spy={true}
                                smooth={true}
                                offset={-100}
                                key={path}
                                className="block text-base text-gray-900 hover:text-brandPrimary first:font-medium"
                            >
                                {link}
                            </Link>
                        ))}
                    </div>
                </nav>
            </header>
        </>
    );
}

// export const RenderMenu = () => {
//     const { user, logout } = AuthData();

//     const MenuItem = ({ route }) => {
//         return (
//             <div className="menuItem">
//                 <Link to={route.path}>{route.name}</Link>
//             </div>
//         );
//     };
//     return (
//         <div className="menu">
//             {nav.map((route, index) => {
//                 if (!route.isAdmin && route.isMenu) {
//                     return <MenuItem key={index} route={route} />;
//                 } else if (user.isAuthenticated && route.isMenu) {
//                     return <MenuItem key={index} route={route} />;
//                 } else return false;
//             })}

//             {user.isAuthenticated ? (
//                 <div className="menuItem">
//                     <Link to={'#'} onClick={logout}>
//                         Log out
//                     </Link>
//                 </div>
//             ) : (
//                 <div className="menuItem">
//                     <Link to={'login'}>Log in</Link>
//                 </div>
//             )}
//         </div>
//     );
// };
// export default Header;
