import React from 'react';

function component() {
    return (
        <div class="bg-gray-900">
            <div class="w-full h-screen">
                <div class="flex h-screen">
                    <div class="m-auto flex flex-col gap-6">
                        {/* ================== SEARCH ================= */}
                        <div className="relative mt-6 mb-12">
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
                                className="w-full py-3 pl-12 text-sm rounded-full sm:w-96 focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900"
                            />
                        </div>

                        <div className="relative mt-3 mb-4">
                            <button className="px-4 py-2 flex space-x-2 bg-white hover:bg-green-500 hover:text-white text-gray-900 text-sm font-medium transition-all duration-300 rounded-full">
                                <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-100">
                                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                </svg>
                                <span>Search</span>
                            </button>
                        </div>

                        {/*================ BUTTON =================*/}
                        <div className="px-4 py-2 border-2 border-green-500 text-green-500 cursor-pointer hover:bg-green-600 hover:text-green-100 rounded-lg">
                            Save changes
                        </div>

                        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium  transition-all duration-300 rounded-full">
                            Success Button
                        </button>

                        {/*================ TEST =================*/}
                        <div className="space-x-5 bg-white">123</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default component;
