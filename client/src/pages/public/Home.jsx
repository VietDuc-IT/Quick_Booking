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
            <div className="bg-neutralSilver">
                <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen">
                    <Carousel className="w-full mx-auto">
                        <div className="my-28 md:my-8 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
                            <div>
                                <img src={banner1} alt="" />
                            </div>

                            {/* hero text */}
                            <div className="md:w-1/2">
                                <h1 className="text-5xl font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug">
                                    Welcome to <span className="text-brandPrimary">Quick Booking</span>
                                </h1>
                                <p className="text-neutralGrey text-base mb-8">welcome to Quick booking</p>
                                <button className="px-7 py-2 bg-brandPrimary text-white rounded hover:bg-neutralDGrey transition-all duration-300 hover:-translate-y-4">
                                    Post New
                                </button>
                            </div>
                        </div>
                        <div className="my-28 md:my-8 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
                            <div>
                                <img src={banner1} alt="" />
                            </div>

                            {/* hero text */}
                            <div className="md:w-1/2">
                                <h1 className="text-5xl font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug">
                                    Welcome to <span className="text-brandPrimary">Quick Booking</span>
                                </h1>
                                <p className="text-neutralGrey text-base mb-8">welcome to Quick booking</p>
                                <button className="px-7 py-2 bg-brandPrimary text-white rounded hover:bg-neutralDGrey transition-all duration-300 hover:-translate-y-4">
                                    Post New
                                </button>
                            </div>
                        </div>
                        <div className="my-28 md:my-8 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
                            <div>
                                <img src={banner2} alt="" />
                            </div>

                            {/* hero text */}
                            <div className="md:w-1/2">
                                <h1 className="text-5xl font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug">
                                    Welcome to <span className="text-brandPrimary">Quick Booking</span>
                                </h1>
                                <p className="text-neutralGrey text-base mb-8">welcome to Quick booking</p>
                                <button className="px-7 py-2 bg-brandPrimary text-white rounded hover:bg-neutralDGrey transition-all duration-300 hover:-translate-y-4">
                                    Post New
                                </button>
                            </div>
                        </div>
                        <div className="my-28 md:my-8 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
                            <div>
                                <img src={banner3} alt="" />
                            </div>

                            {/* hero text */}
                            <div className="md:w-1/2">
                                <h1 className="text-5xl font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug">
                                    Welcome to <span className="text-brandPrimary">Quick Booking</span>
                                </h1>
                                <p className="text-neutralGrey text-base mb-8">welcome to Quick booking</p>
                                <button className="px-7 py-2 bg-brandPrimary text-white rounded hover:bg-neutralDGrey transition-all duration-300 hover:-translate-y-4">
                                    Post New
                                </button>
                            </div>
                        </div>
                    </Carousel>
                </div>
            </div>
            <Cards />
        </>
    );
}

export default Home;
