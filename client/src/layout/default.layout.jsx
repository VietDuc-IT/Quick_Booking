import React from 'react';
import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// MainLayout Component
const DefaultLayout = () => {
    return (
        <>
            <Header />
            <main>
                <div className="mx-auto mt-16 py-4 bg-m_main dark:bg-d_main flex min-w-0 max-w-7xl flex-col ">
                    <Outlet />
                </div>
            </main>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default DefaultLayout;
