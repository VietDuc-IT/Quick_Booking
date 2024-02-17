import React from 'react';
import Header from '~/components/system/Header';
import Sidebar from '~/components/system/Sidebar';
import { Outlet } from 'react-router-dom';

// SystemLayout Component
const SystemLayout = () => {
    return (
        // <div>
        //     <Header />

        //     <div className="mt-16 py-1">
        //         <Sidebar />

        //         {/* ===================================== CONTAINER ================================ */}
        //         <div class="p-4 sm:ml-64">
        //             <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        //                 <Outlet />
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="bg-gray-300 dark:bg-d_body">
            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className="flex h-screen overflow-hidden">
                {/* <!-- ===== Sidebar Start ===== --> */}
                <Sidebar />
                {/* <!-- ===== Sidebar End ===== --> */}

                {/* <!-- ===== Content Area Start ===== --> */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/* <!-- ===== Header Start ===== --> */}
                    <Header />
                    {/* <!-- ===== Header End ===== --> */}

                    {/* <!-- ===== Main Content Start ===== --> */}
                    <main>
                        <div class="p-4 rounded-lg dark:border-gray-700">
                            <Outlet />
                        </div>
                    </main>
                    {/* <!-- ===== Main Content End ===== --> */}
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
            </div>
            {/* <!-- ===== Page Wrapper End ===== --> */}
        </div>
    );
};

export default SystemLayout;
