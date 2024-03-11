import axios from '~/ultils/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductSlider from '~/components/public/ProductSlider';
import FilterTop from '~/components/public/FilterTop';
import { MdOutlineAddHomeWork, MdOutlineBedroomParent, MdOutlineChair, MdOutlineMapsHomeWork } from 'react-icons/md';
import { PiSelectionBackgroundBold, PiToilet } from 'react-icons/pi';
import { FaArrowsAltH, FaArrowsAltV } from 'react-icons/fa';
import { RiHomeGearLine } from 'react-icons/ri';
import Comment from '~/components/public/CommentSection';
import Map from '~/components/public/Map';

function Details() {
    const { id } = useParams();
    const [data, setData] = useState();

    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/post/${id}`);
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <>
            <FilterTop />

            <div className="max-w-7xl mx-auto p-5">
                <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-2 bg-m_main dark:bg-d_main p-5">
                        {/* Image Slider */}
                        <ProductSlider img={data?.imageUrls} />
                        {/* Title */}
                        <div className="mt-10">
                            <span className="text-xl text-primary-default font-semibold">{data?.title}</span>
                        </div>
                        {/* Detail */}
                        <div className="grid grid-cols-2 my-5">
                            <li class="flex items-center space-x-3 rtl:space-x-reverse col-span-2 my-4">
                                <MdOutlineMapsHomeWork class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />
                                <span class="font-semibold text-gray-900 dark:text-white">Cho Thuê</span>
                            </li>
                            <ul class="space-y-4 text-left text-gray-500 dark:text-gray-400">
                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <PiSelectionBackgroundBold class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />

                                    <span>
                                        <span class="font-semibold text-gray-900 dark:text-white">Diện tích đất: </span>
                                        Free updates:{' '}
                                    </span>
                                </li>
                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <FaArrowsAltH class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />

                                    <span>
                                        <span class="font-semibold text-gray-900 dark:text-white">Chiều ngang: </span>
                                        Free updates:{' '}
                                    </span>
                                </li>
                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <FaArrowsAltV class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />

                                    <span>
                                        <span class="font-semibold text-gray-900 dark:text-white">Chiều dài: </span>
                                        Free updates:{' '}
                                    </span>
                                </li>
                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <MdOutlineChair class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />

                                    <span>
                                        <span class="font-semibold text-gray-900 dark:text-white">Nội thất: </span>
                                        Free updates:{' '}
                                    </span>
                                </li>
                            </ul>
                            <ul class="space-y-4 text-left text-gray-500 dark:text-gray-400">
                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <RiHomeGearLine class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />

                                    <span>
                                        <span class="font-semibold text-gray-900 dark:text-white">Tiện ích: </span>
                                        Nhà ngỏ, hẻm
                                    </span>
                                </li>
                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <MdOutlineBedroomParent class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />

                                    <span>
                                        <span class="font-semibold text-gray-900 dark:text-white">Phòng ngủ: </span>
                                        Free updates:{' '}
                                    </span>
                                </li>
                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <PiToilet class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />

                                    <span>
                                        <span class="font-semibold text-gray-900 dark:text-white">Nhà vệ sinh: </span>
                                        Free updates:{' '}
                                    </span>
                                </li>
                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <MdOutlineAddHomeWork class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />

                                    <span>
                                        <span class="font-semibold text-gray-900 dark:text-white">Số tầng: </span>
                                        Free updates:{' '}
                                    </span>
                                </li>
                            </ul>
                            <div className="col-span-2 mt-10">
                                <span class="font-semibold text-gray-900 dark:text-white">Mô tả chi tiết</span>
                                <p className="mt-3">{data?.description}</p>
                            </div>
                        </div>

                        <Map />

                        <Comment />
                    </div>
                    <div className="bg-m_main dark:bg-d_main"></div>
                </div>
            </div>
        </>
    );
}

export default Details;
