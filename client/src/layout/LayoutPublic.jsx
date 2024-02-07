import { useState } from 'react';
import Header from '../components/public/Header';
import Footer from '../components/public/Footer';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
    return (
        <div className="w-full min-w-0 flex-auto">
            <div className="relative bg-white antialiased dark:bg-gray-900 dark:text-gray-300">
                {/* <!-- ===== Header Start ===== --> */}
                <Header />
                {/* <!-- ===== Header End ===== --> */}

                {/* <!-- ===== Main Content Start ===== --> */}
                <main className="mx-auto mt-16 bg-neutralSilver flex min-w-0 max-w-7xl flex-col px-4 lg:px-8">
                    <Outlet />
                </main>
                {/* <!-- ===== Main Content End ===== --> */}

                {/* <!-- ===== Footer Start ===== --> */}
                <Footer />
                {/* <!-- ===== Footer End ===== --> */}
            </div>
        </div>
    );
};

export default DefaultLayout;
