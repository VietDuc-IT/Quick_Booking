import React from 'react';
import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BackToTop from '~/components/BackToTop';
import ChatBox from '~/components/ChatBox';

const DefaultLayout = () => {
    return (
        <>
            {/* =============== Header Begin =============== */}
            <Header />
            {/* =============== Header End =============== */}

            {/* =============== Body Begin =============== */}
            <main>
                <div className="mt-[61px]">
                    <Outlet />
                </div>
            </main>

            {/* =============== Body End =============== */}

            {/* =============== Footer Begin =============== */}
            <Footer />
            {/* =============== Footer End =============== */}

            <BackToTop />
            <ChatBox />

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
