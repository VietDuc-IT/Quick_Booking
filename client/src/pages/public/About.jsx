import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDriveFolderUpload, MdLocationOn } from 'react-icons/md';

function About() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        setSelectedOption(value);
    };
    return (
        <>
            <div class="bg-gray-900">
                <div class="w-full h-screen">
                    <div class="flex h-screen">
                        <div class="m-auto flex flex-col gap-6">
                            {/* ================== Bell ================= */}
                            <div class="relative inline-flex w-fit">
                                <div class="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-red-500 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                                    12
                                </div>
                                <button type="button">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        class="text-gray-600 w-6 h-6 hover:text-gray-900 dark:hover:text-gray-300"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                                    </svg>
                                </button>
                            </div>
                            {/*================ BUTTON =================*/}
                            <button
                                type="button"
                                class="text-white bg-primary hover:bg-primary6 focus:ring-4 focus:ring-primary3 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary dark:hover:bg-primary6 focus:outline-none dark:focus:ring-primary7"
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                class="text-white bg-primary hover:bg-primary6 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-primary dark:hover:bg-primary6 dark:focus:ring-primary6 h-10 mt-7 ml-3 w-48"
                                // className="px-4 py-2 text-sm font-medium border-green-400 text-green-500 hover:shadow-sm hover:shadow-green-500 dark:hover:shadow-md dark:hover:shadow-green-500 cursor-pointer rounded border-2 h-10 mt-7 ml-3 w-48"
                            >
                                <MdDriveFolderUpload class="w-4 h-4 me-2" />
                                Upload image
                            </button>

                            {/*================ TEST =================*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
