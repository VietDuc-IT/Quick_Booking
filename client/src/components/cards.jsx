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
            title: 'CHO THUÊ NHÀ PHỐ 5x20m CITYLAND P10 GÒ VẤPpppppppppppppppppppppppppppppppp',
            img: 'https://th.bing.com/th/id/OIP.f8odHPVFOumwzxgbCtzCIQAAAA?pid=ImgDet&w=182&h=182&c=7&dpr=1.3',
            address: 'Phan Văn Trị, Phường 10, Quận Gò Vấp, Tp Hồ Chí Minh',
            description:
                'ngang 5 dài 20m, 1 hầm + 4 tầng, 7 phòng. Đường xe hơi, thông thoáng. Thiết kế phù hợp làm văn phòng, cty, trường học, spa…1111111111111111111111111111',
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
                    <div class="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-clip-border shadow shadow-gray-500/40 dark:shadow-gray-600/70 hover:shadow-md hover:shadow-green-500 dark:hover:shadow-md dark:hover:shadow-green-500 cursor-pointer">
                        <div class="relative mx-4 mt-4 overflow-hidden shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
                            <img src={card.img} alt="" className="h-60 w-full object-cover" />
                            <div class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                            <button
                                class="!absolute  top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        class="w-6 h-6"
                                    >
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                                    </svg>
                                </span>
                            </button>
                            <p class="!absolute top-4 left-4 flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    class="-mt-0.5 h-5 w-5 text-yellow-400"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                5.0
                            </p>
                            <div class="!absolute bottom-0 left-4 bg-white rounded-t-md opacity-80">
                                <p className="text-gray-800 text-sm p-1">Phòng trọ</p>
                            </div>
                        </div>
                        <div class="px-6 py-3">
                            <h5 class="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900 mb-3">
                                <p className="h-14 line-clamp-2 hover:text-primary">{card.title}</p>
                            </h5>
                            <p class="block font-sans text-base antialiased font-light leading-relaxed text-gray-700 dark:text-gray-400">
                                <p className="line-clamp-2">{card.description}</p>
                            </p>
                            <div class="inline-flex flex-wrap items-center gap-3 mt-4 group">
                                <p className="line-clamp-1">{card.address}</p>
                            </div>
                        </div>
                        <div class="font-medium border-t border-gray-200 dark:border-gray-700" />
                        <div class="px-6 pb-3 my-2">
                            <div className="flex justify-between gap-2 mt-3">
                                <div className="">
                                    <p className="font-medium text-sm">{card.price} VNĐ / tháng</p>
                                </div>
                                <div className="flex space-x-3">
                                    {' '}
                                    <div className="font-bold text-xs flex">
                                        <MdOutlineComment className="mr-1 mt-0.5 text-sm" />
                                        {card.comment}{' '}
                                    </div>{' '}
                                    <div className="font-bold text-xs flex">
                                        <MdOutlineAccessTime className="mr-1 text-sm" />
                                        {card.time} ago{' '}
                                    </div>{' '}
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
