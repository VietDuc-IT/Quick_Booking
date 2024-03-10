import React from 'react';
import { MdOutlineAccessTime, MdOutlineComment } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Cards = (props) => {
    const formatPrice = (price) => {
        // Convert the input string to an integer
        price = parseInt(price, 10);

        // Divide the number by 1,000 to get the thousands part and the remainder
        const millions = Math.floor(price / 1000000);
        const thousands = Math.floor((price % 1000000) / 1000);
        const units = price % 1000;

        // Format the result as a string with the appropriate units
        let formattedPrice = '';
        if (millions > 0) {
            formattedPrice += `${millions}tr`;
        }
        if (thousands > 0) {
            formattedPrice += `${thousands}`;
        }
        if (units > 0) {
            formattedPrice += `${units}`;
        }
        // formattedPrice += ' VNĐ';

        return formattedPrice;
    };

    const timeAgo = (timestamp) => {
        const currentDate = new Date();
        const previousDate = new Date(timestamp);
        const timeDifference = currentDate - previousDate;

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return days === 1 ? '1 ngày trước' : `${days} ngày trước`;
        } else if (hours > 0) {
            return hours === 1 ? '1 giờ trước' : `${hours} giờ trước`;
        } else if (minutes > 0) {
            return minutes === 1 ? '1 phút trước' : `${minutes} phút trước`;
        } else {
            return seconds <= 10 ? 'bây giờ' : `${seconds} giây trước`;
        }
    };

    return (
        <>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mx-auto gap-4">
                {props.Data?.map((items) => (
                    <Link to={`/post/${items._id}`}>
                        <div class="relative flex w-full max-w-[26rem] bg-m_main dark:bg-d_main flex-col rounded-xl bg-clip-border shadow shadow-gray-500/40 dark:shadow-gray-600/70 hover:shadow-md hover:shadow-primary-default dark:hover:shadow-md dark:hover:shadow-primary-default cursor-pointer">
                            {/* top */}
                            <div className="relative max-w-full overflow-hidden shadow-lg rounded-t-md bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
                                <img
                                    src={items.imageUrls}
                                    alt=""
                                    className="h-52 max-w-full w-full object-cover transition duration-300 ease-in-out hover:scale-110"
                                />

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
                                    <p className="text-gray-800 text-sm p-1">{items.category}</p>
                                </div>
                            </div>
                            {/* body */}
                            <div class="px-3 py-2 mt-2">
                                <h5 class="block font-sans text-base antialiased font-medium leading-snug tracking-normal text-blue-gray-900 mb-2">
                                    <p className="line-clamp-2 hover:text-primary">{items.title}</p>
                                </h5>
                                <p class="block font-sans text-sm antialiased font-light leading-relaxed text-gray-700 dark:text-gray-400">
                                    <p className="line-clamp-2">{items.description}</p>
                                </p>

                                <div class="text-sm mt-2">
                                    <FaMapMarkerAlt className="relative top-4" />
                                    <p className="ml-4 line-clamp-1"> {items.address}</p>
                                </div>
                            </div>
                            {/* bot */}
                            <div class="font-medium border-t border-gray-200 dark:border-gray-700" />
                            <div class="px-3 pb-3 my-1">
                                <div className="flex justify-between gap-2 mt-3">
                                    <div className="">
                                        <p className="font-medium text-sm">
                                            {formatPrice(items.price)} <span className="text-xs">VNĐ/tháng</span>
                                        </p>
                                    </div>
                                    <div className="flex space-x-2 mt-1">
                                        <div className="font-bold text-xs flex">
                                            <MdOutlineComment className="mr-1 mt-0.5 text-sm" />
                                            {items.comment}5
                                        </div>
                                        <div className="font-bold text-xs flex">
                                            <MdOutlineAccessTime className="mr-1 text-sm" />
                                            {timeAgo(items.createdAt)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Cards;
