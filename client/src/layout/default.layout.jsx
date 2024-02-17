import React from 'react';
import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import { Outlet } from 'react-router-dom';

// MainLayout Component
const DefaultLayout = () => {
    return (
        <>
            <Header />
            <main>
                <div className="mx-auto mt-16 py-4 bg-m_main dark:bg-d_main flex min-w-0 max-w-7xl flex-col px-4 lg:px-8">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default DefaultLayout;
