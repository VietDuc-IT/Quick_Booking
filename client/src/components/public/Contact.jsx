import { Avatar } from 'flowbite-react';
import Button from '../Button';
import { FaPhoneVolume } from 'react-icons/fa6';
import { AiFillMessage } from 'react-icons/ai';
import { IoCalendarSharp } from 'react-icons/io5';
import { useState } from 'react';

function Contact({ data }) {
    const [call, setCall] = useState(false);

    const phone = (number) => {
        const str = number?.toString();
        const replace = '***';
        return str?.slice(0, -3) + replace;
    };

    return (
        <>
            <div className="bg-m_main dark:bg-d_main p-5 sticky top-20">
                <Avatar img={data?.profilePicture} rounded size="lg" statusPosition="bottom-right" />
                <div className="grid grid-rows-4 justify-items-center mb-3">
                    <span className="text-sm font-medium text-green-500">Đang hoạt động</span>
                    <span>{data?.username}</span>
                    <span>0{phone(data?.phoneNumber)}</span>
                    <span>Khu vực: TP Hồ Chí Minh</span>
                </div>
                <div className="gap-5 space-x-3 space-y-3 mb-5">
                    <div>
                        <span>Gợi ý liên hệ: </span>
                    </div>
                    <Button btn="round">Nhà này còn không?</Button>
                    <Button btn="round">Nội thất thế nào?</Button>
                    <Button btn="round">Thời hạn cho thuê là bao lâu?</Button>
                    <Button btn="round">Có phát sinh thêm chi phí khi thuê nhà không?</Button>
                </div>
                <div className="space-y-4">
                    <Button
                        btn="outline"
                        className="w-full flex justify-center items-center"
                        onClick={() => setCall(!call)}
                    >
                        <FaPhoneVolume className="h-6 w-6 mr-5" />
                        {call ? `0${data?.phoneNumber}` : 'Alo cho chủ nhà'}
                    </Button>
                    <Button btn="primary" className="w-full flex justify-center items-center">
                        <AiFillMessage className="h-6 w-6 mr-5" />
                        Nhắn tin với người cho thuê
                    </Button>
                    <Button btn="dark" className="w-full flex justify-center items-center">
                        <IoCalendarSharp className="h-6 w-6 mr-5" />
                        Đặt lịch xem phòng
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Contact;
