import React from 'react';
import { Carousel } from 'flowbite-react';
import banner1 from '~/assets/images/banner/house1lg.png';
import banner2 from '~/assets/images/banner/house2lg.png';
import banner3 from '~/assets/images/banner/house3lg.png';
import Cards from '~/components/cards';

function Home() {
    return (
        <>
            {/* BANNER */}
            <div>
                <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto">
                    <div className="grid h-56 grid-cols-2 gap-4 sm:h-64 xl:h-80 2xl:h-96">
                        {/* hero text */}
                        <div className="m-auto">
                            <div>
                                <h1 className="font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug">
                                    <span className="text-4xl">Welcome to</span>
                                    <div>
                                        <span className="text-green-500 text-5xl">
                                            Quick <span className="text-m_text dark:text-d_text text-4xl">Booking</span>
                                        </span>
                                    </div>
                                </h1>
                                <p className="text-neutralGrey text-base mb-8">
                                    Welcome to Quick booking, take a deep dive and browse homes or apartments for rent
                                    and local insights to find what is right for you.
                                </p>
                                <button className="px-7 py-2 bg-green-500 text-white rounded hover:bg-neutralDGrey transition-all duration-300 hover:-translate-y-4">
                                    Post New
                                </button>
                            </div>
                        </div>
                        <Carousel pauseOnHover>
                            <img src={banner1} alt="" />
                            <img src={banner2} alt="" />
                            <img src={banner3} alt="" />
                        </Carousel>
                    </div>
                </div>
            </div>
            <Cards />
        </>
    );
}

export default Home;
