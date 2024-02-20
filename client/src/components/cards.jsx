import React from 'react';
import { MdLocationOn, MdOutlineAccessTime, MdOutlineComment } from 'react-icons/md';

function cards() {
    const dataCard = [
        {
            id: 1,
            title: 'CHO THUÊ NHÀ PHỐ 5x20m CITYLAND P10 GÒ VẤP',
            img: 'https://cdnassets.hw.net/6a/9c/8c1fe2c24fda99c47ae1f196b2c7/docomomous-esherickhouse-04.jpg',
            address: 'Phan Văn Trị, Phường 10, Quận Gò Vấp, Tp Hồ Chí Minh',
            description:
                'ngang 5 dài 20m, 1 hầm + 4 tầng, 7 phòng. Đường xe hơi, thông thoáng. Thiết kế phù hợp làm văn phòng, cty, trường học, spa…',
            price: '1.000.000',
            comment: 5,
            action: 15,
            time: '24h',
        },
        {
            id: 1,
            title: 'CHO THUÊ NHÀ PHỐ 5x20m CITYLAND P10 GÒ VẤP',
            img: 'https://th.bing.com/th/id/R.02b45d2cdc2f8ac30c783c7db888a585?rik=VZjor0TbCTD5Wg&pid=ImgRaw&r=0',
            address: 'Phan Văn Trị, Phường 10, Quận Gò Vấp, Tp Hồ Chí Minh',
            description:
                'ngang 5 dài 20m, 1 hầm + 4 tầng, 7 phòng. Đường xe hơi, thông thoáng. Thiết kế phù hợp làm văn phòng, cty, trường học, spa…',
            price: '1.000.000',
            comment: 5,
            action: 15,
            time: '24h',
        },
        {
            id: 1,
            title: 'CHO THUÊ NHÀ PHỐ 5x20m CITYLAND P10 GÒ VẤP',
            img: 'https://i.pinimg.com/originals/a4/17/ad/a417adbc98b1cd4d5ce70d6f2c194788.jpg',
            address: 'Phan Văn Trị, Phường 10, Quận Gò Vấp, Tp Hồ Chí Minh',
            description:
                'ngang 5 dài 20m, 1 hầm + 4 tầng, 7 phòng. Đường xe hơi, thông thoáng. Thiết kế phù hợp làm văn phòng, cty, trường học, spa…',
            price: '1.000.000',
            comment: 5,
            action: 15,
            time: '24h',
        },
        {
            id: 1,
            title: 'CHO THUÊ NHÀ PHỐ 5x20m CITYLAND P10 GÒ VẤP',
            img: 'https://th.bing.com/th/id/OIP.f8odHPVFOumwzxgbCtzCIQAAAA?pid=ImgDet&w=182&h=182&c=7&dpr=1.3',
            address: 'Phan Văn Trị, Phường 10, Quận Gò Vấp, Tp Hồ Chí Minh',
            description:
                'ngang 5 dài 20m, 1 hầm + 4 tầng, 7 phòng. Đường xe hơi, thông thoáng. Thiết kế phù hợp làm văn phòng, cty, trường học, spa…',
            price: '1.000.000',
            comment: 5,
            action: 15,
            time: '24h',
        },
        {
            id: 1,
            title: 'CHO THUÊ NHÀ PHỐ ',
            img: 'https://th.bing.com/th/id/OIP.f8odHPVFOumwzxgbCtzCIQAAAA?pid=ImgDet&w=182&h=182&c=7&dpr=1.3',
            address: 'Phan Văn Trị, Phường 10, Quận Gò Vấp, Tp Hồ Chí Minh',
            description:
                'ngang 5 dài 20m, 1 hầm + 4 tầng, 7 phòng. Đường xe hơi, thông thoáng. Thiết kế phù hợp làm văn phòng, cty, trường học, spa…',
            price: '1.000.000',
            comment: 5,
            action: 15,
            time: '24h',
        },
    ];
    return (
        <>
            <section className="mt-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:w-11/12 mx-auto gap-12">
                {dataCard.map((card) => (
                    <div
                        key={card.id}
                        className="px-3 text-center md:w-[300] mx -auto md:h-96 rounded-md shadow cursor-pointer hover:-translate-y-5 hover:border-b-4 hover:border-primary dark:hover:border-primary dark:hover:border-b-4 transition-all duration-300 flex items-center justify-center h-full dark:shadow-gray-600"
                    >
                        <div className="w-full">
                            {/* <div className="bg-gray-200 mb-4 h-14 w-14 mx-auto rounded-tl-3xl rounded-br-3xl">
                                <img src={card.img} alt="" className="-ml-5" />
                            </div> */}
                            <div className="relative">
                                <img src={card.img} alt="home" className="h-52 w-full object-cover rounded-md" />
                            </div>
                            <div className="h-36">
                                <h4 className="text-base font-bold text-neutralDGrey my-2 px-2 line-clamp-2">
                                    {card.title}
                                </h4>
                                <div className="flex items-center gap-1">
                                    <MdLocationOn className="text-xl text-primary" />
                                    <p className="text-sm line-clamp-1 text-gray-800 dark:text-d_text hover:text-primary dark:hover:text-primary">
                                        {card.address}
                                    </p>
                                </div>
                                <div className="text-left">
                                    <p className="text-sm line-clamp-2 text-gray-500 dark:text-gray-400">
                                        {card.description}
                                    </p>
                                    <div className="flex gap-2 mt-2">
                                        <p className="font-medium text-sm">{card.price} VNĐ / tháng</p>
                                        <div className="flex space-x-3 ml-4">
                                            <div className="font-bold text-xs flex">
                                                <MdOutlineComment className="mr-1 mt-0.5 text-sm" />
                                                {card.comment}
                                            </div>
                                            <div className="font-bold text-xs flex">
                                                <MdOutlineAccessTime className="mr-1 text-sm" />
                                                {card.time} ago
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}

export default cards;
