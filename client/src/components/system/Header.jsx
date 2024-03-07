import { Avatar, Button, Dropdown } from 'flowbite-react';
import { FaMoon, FaSun } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleTheme } from '~/redux/theme/themeSlice';
import { signOutSuccess } from '~/redux/user/userSlice';
import { httpRequest } from '~/ultils/httpRequest';
import AvatarUser from '../Avatar';
import DarkMode from '../DarkMode';

function Header() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.theme);
    let axiosJWT = httpRequest(currentUser, dispatch);

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

    return (
        <header className="sticky top-0 bg-gray-100 dark:bg-d_main flex w-full drop-shadow-1">
            <div className="flex flex-grow items-center justify-between py-3 px-4 shadow-2 md:px-6 2xl:px-11">
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
                            className="w-full py-2 pl-12 text-sm font-medium rounded-md sm:w-96 focus:outline-none text-gray-900 dark:bg-d_text dark:text-m_text "
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-10 mr-5">
                    {/* ================== DarkMode ================= */}
                    <DarkMode />
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
                    {/* ================== Nav-Right ================= */}
                    <AvatarUser />
                </div>
            </div>
        </header>
    );
}

export default Header;
