import React from 'react';

function About() {
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

                            {/*================ TEST =================*/}
                            <div className="space-x-5 bg-white">123</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
