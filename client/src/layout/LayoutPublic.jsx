import { useState } from 'react';
// import Header from "../components/public/Header";
import Footer from '../components/public/Footer';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div>
            {/* <!-- ===== Header Start ===== --> */}
            {/* <Header /> */}
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
                <Outlet />
            </main>
            {/* <!-- ===== Main Content End ===== --> */}

            {/* <!-- ===== Footer Start ===== --> */}
            <Footer />
            {/* <!-- ===== Footer End ===== --> */}
        </div>
    );
};

export default DefaultLayout;
