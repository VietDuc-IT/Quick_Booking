import { Tooltip } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { httpRequest } from '~/ultils/httpRequest';

function News() {
    const { currentUser } = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    let axiosJWT = httpRequest(currentUser, dispatch);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosJWT.get('/post/get', {
                    headers: { token: `bearer ${currentUser.accessToken}` },
                });
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
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
                                    Bài đăng
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div>
                <div class="relative overflow-x-auto">
                    <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 m-1">
                        {/* ===================== Action left ================== */}
                        <div>
                            <button
                                id="dropdownActionButton"
                                data-dropdown-toggle="dropdownAction"
                                class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                type="button"
                            >
                                <span class="sr-only">Action button</span>
                                Action
                                <svg
                                    class="w-2.5 h-2.5 ms-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            {/* <!-- Dropdown menu --> */}
                            <div
                                id="dropdownAction"
                                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <ul
                                    class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownActionButton"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Reward
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Promote
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Activate account
                                        </a>
                                    </li>
                                </ul>
                                <div class="py-1">
                                    <a
                                        href="#"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Delete User
                                    </a>
                                </div>
                            </div>
                        </div>
                        <label for="table-search" class="sr-only">
                            Search
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>

                            <input
                                type="search"
                                name="Search"
                                class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                                placeholder="Search for users"
                            />
                        </div>
                    </div>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="p-4">
                                    <div class="flex items-center">
                                        <input
                                            id="checkbox-all-search"
                                            type="checkbox"
                                            class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label for="checkbox-all-search" class="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </th>
                                <th scope="col" class="px-1 py-3">
                                    Bài đăng
                                </th>

                                {currentUser.role === 'Admin' && (
                                    <th scope="col" class="px-4 py-3">
                                        Tác giả
                                    </th>
                                )}
                                <th scope="col" class="px-4 py-3">
                                    Loại
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Tương tác
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Trạng thái
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Ngày tạo
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((product) => (
                                <>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="w-2 p-4">
                                            <div class="flex items-center">
                                                <input
                                                    id="checkbox-table-search-1"
                                                    type="checkbox"
                                                    class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label for="checkbox-table-search-1" class="sr-only">
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>

                                        <th
                                            scope="row"
                                            class="flex items-center px-1 py-4 text-gray-900 whitespace-nowrap dark:text-white w-96"
                                        >
                                            <img class="w-14 h-10 rounded-sm" src={product.imageUrls} />
                                            <div class="ps-3">
                                                <div className="w-96">
                                                    <Tooltip content={product.title}>
                                                        <p class="text-base font-semibold truncate w-72">
                                                            {product.title}
                                                        </p>
                                                    </Tooltip>
                                                    <p class="font-normal text-gray-500 truncate w-72">
                                                        {product.address}
                                                    </p>
                                                </div>
                                            </div>
                                        </th>

                                        {currentUser.role === 'Admin' && (
                                            <td class="px-4 py-4">
                                                <div className="min-w-32">
                                                    <div class="text-base font-semibold">{product.userId.username}</div>
                                                    <div class="font-normal text-gray-500">{product.userId.email}</div>
                                                </div>
                                            </td>
                                        )}
                                        <td class="px-4 py-4">
                                            <div class="flex items-center w-20">{product.category}</div>
                                        </td>
                                        <td class="px-4 py-4">
                                            <div className="flex justify-center min-w-20">
                                                50
                                                <AiOutlineComment className="h-5 w-5 ml-3" />
                                            </div>
                                        </td>
                                        <td class="px-4 py-4">
                                            {/* <div class="flex items-center w-20">Chờ duyệt</div> */}
                                            <div class="flex items-center min-w-20">{product.status}</div>
                                        </td>
                                        <td class="px-4 py-4">{new Date(product.createdAt).toLocaleDateString()}</td>
                                        <td class="px-4 py-4">
                                            <div className="space-x-1 min-w-36">
                                                <button class="font-medium text-green-600 dark:text-green-500 hover:underline">
                                                    Xem
                                                </button>
                                                <span>/</span>
                                                {currentUser.role === 'Admin' ? (
                                                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                        Duyệt
                                                    </button>
                                                ) : (
                                                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                        Sửa
                                                    </button>
                                                )}
                                                <span>/</span>
                                                <button class="font-medium text-red-500 dark:text-red-500 hover:underline">
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default News;
