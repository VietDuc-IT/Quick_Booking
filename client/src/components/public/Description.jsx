import { MdOutlineAddHomeWork, MdOutlineBedroomParent, MdOutlineChair, MdOutlineMapsHomeWork } from 'react-icons/md';
import { PiSelectionBackgroundBold, PiToilet } from 'react-icons/pi';
import { FaArrowsAltH, FaArrowsAltV, FaRegShareSquare, FaRegHeart } from 'react-icons/fa';
import { RiHomeGearLine } from 'react-icons/ri';
import { IoShieldCheckmark, IoTimeSharp } from 'react-icons/io5';

function Description({ data }) {
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

    const detail1 = [
        { icon: PiSelectionBackgroundBold, name: 'Diện tích đất', detail: data?.detail[0] },
        { icon: FaArrowsAltH, name: 'Chiều ngang', detail: data?.detail[1] },
        { icon: FaArrowsAltH, name: 'Chiều dài', detail: data?.detail[2] },
        { icon: MdOutlineChair, name: 'Nội thất', detail: data?.detail[3] },
    ];

    const detail2 = [
        { icon: RiHomeGearLine, name: 'Tiện ích', detail: data?.detail[4] },
        { icon: MdOutlineBedroomParent, name: 'Phòng ngủ', detail: data?.detail[5] },
        { icon: PiToilet, name: 'Nhà vệ sinh', detail: data?.detail[6] },
        { icon: MdOutlineAddHomeWork, name: 'Số tầng', detail: data?.detail[7] },
    ];

    return (
        <div>
            {/* Title */}
            <div className="mt-10 space-y-2">
                <p className="text-xl text-primary-default font-semibold">{data?.title}</p>
                <p className="text-base font-semibold">Giá: {formatPrice(data?.price)} VNĐ/tháng</p>
                <p className="text-gray-500 dark:text-gray-400">
                    <span class="font-semibold text-gray-900 dark:text-white">Địa chỉ: </span>
                    {data?.address}
                </p>
                <div className="flex justify-between">
                    <div class="flex items-center space-x-3 rtl:space-x-reverse col-span-2 my-4">
                        <IoShieldCheckmark class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />
                        <span class="font-semibold text-gray-900 dark:text-white">Tin đã được kiểm duyệt.</span>
                    </div>
                    <div class="flex items-center space-x-3 rtl:space-x-reverse col-span-2 my-4">
                        <IoTimeSharp class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />
                        <span class="font-semibold text-gray-900 dark:text-white">
                            Đăng {timeAgo(data?.createdAt)}.
                        </span>
                    </div>
                    <div className="flex space-x-3">
                        <div class="flex items-center space-x-3 rtl:space-x-reverse col-span-2 my-4">
                            <FaRegShareSquare class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />
                            <span class="font-base text-gray-900 dark:text-white">Chia sẽ.</span>
                        </div>
                        <div class="flex items-center space-x-3 rtl:space-x-reverse col-span-2 my-4">
                            <FaRegHeart class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />
                            <span class="font-base text-gray-900 dark:text-white">Lưu tin.</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Detail */}
            <div className="grid grid-cols-2 my-5">
                <div class="flex items-center space-x-3 rtl:space-x-reverse col-span-2 my-4">
                    <MdOutlineMapsHomeWork class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />

                    <span>
                        <span class="font-semibold text-gray-900 dark:text-white">Cho Thuê: </span>
                        {data?.category}
                    </span>
                </div>
                <ul class="space-y-4 text-left text-gray-500 dark:text-gray-400">
                    {detail1.map((item) => (
                        <li class="flex items-center space-x-3 rtl:space-x-reverse">
                            <item.icon class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />

                            <span>
                                <span class="font-semibold text-gray-900 dark:text-white">{item.name}: </span>
                                {item.detail}{' '}
                            </span>
                        </li>
                    ))}
                </ul>
                <ul class="space-y-4 text-left text-gray-500 dark:text-gray-400">
                    {detail2.map((item) => (
                        <li class="flex items-center space-x-3 rtl:space-x-reverse">
                            <item.icon class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />

                            <span>
                                <span class="font-semibold text-gray-900 dark:text-white">{item.name}: </span>
                                {item.detail}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="col-span-2 mt-10">
                    <span class="font-semibold text-gray-900 dark:text-white">Mô tả chi tiết</span>
                    <p className="mt-3">{data?.description}</p>
                </div>
            </div>
        </div>
    );
}

export default Description;
