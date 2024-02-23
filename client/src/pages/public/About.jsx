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
                            {/* ================== SEARCH ================= */}

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
