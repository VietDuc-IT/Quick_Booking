import { Carousel } from 'flowbite-react';
import { Link } from 'react-router-dom';
import banner1 from '~/assets/images/banner/house1lg.png';
import banner2 from '~/assets/images/banner/house2lg.png';
import banner3 from '~/assets/images/banner/house3lg.png';
import Button from '../Button';

function Banner() {
    return (
        <>
            <div className="pb-14 bg-gradient-to-t from-black-default to-primary-default">
                <div className="p-5 max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
                        {/* text */}
                        <div className="flex flex-col justify-center items-center">
                            <div className="my-3">
                                <span className="text-m_main text-5xl font-semibold">
                                    Quick <span className="text-m_text text-4xl">Booking</span>
                                </span>
                            </div>

                            <p className="text-m_main text-base font-medium mb-8">
                                Chào mừng đến với trang web cho thuê và bán nhà của chúng tôi - nơi kết nối giữa người
                                muốn thuê hoặc mua nhà và các chủ nhà uy tín. Khám phá các danh sách đa dạng, đáp ứng
                                mọi nhu cầu ở mọi địa điểm!
                            </p>
                            <Button btn="primary">Đăng tin</Button>
                        </div>
                        <Carousel pauseOnHover className="h-72">
                            <img src={banner1} alt="" />
                            <img src={banner2} alt="" />
                            <img src={banner3} alt="" />
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Banner;
