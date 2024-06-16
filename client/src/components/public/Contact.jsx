import { Avatar } from 'flowbite-react';
import Button from '../Button';
import { FaPhoneVolume } from 'react-icons/fa6';
import { AiFillMessage } from 'react-icons/ai';
import { useState } from 'react';
import MessageContainer from './message/Container';
import CalendarContainer from './bookCalendar/ModalContainer';
import { useSelector } from 'react-redux';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { currentUser } from '~/redux/selectors';
import { useParams } from 'react-router-dom';

function Contact({ data }) {
    const User = useSelector(currentUser);
    const axiosPrivate = useAxiosPrivate();
    const { id } = useParams();
    const [call, setCall] = useState(false);
    const [openMessage, setOpenMessage] = useState(false);

    const phone = (number) => {
        const str = number?.toString();
        const replace = '***';
        return str?.slice(0, -3) + replace;
    };

    const handleBookCalendar = async ({ date, time }) => {
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        const dataBookcalendar = {
            renterId: User._id,
            hostId: data._id,
            postId: id,
            date: formattedDate,
            time,
        };
        try {
            const res = await axiosPrivate.post(`api/schedule`, dataBookcalendar, {
                headers: { token: `bearer ${User.accessToken}` },
            });
            toast.success(res.data.message);
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                console.log(err.message);
            }
        }
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
                    <Button
                        btn="primary"
                        className="w-full flex justify-center items-center"
                        onClick={() => setOpenMessage(!openMessage)}
                    >
                        <AiFillMessage className="h-6 w-6 mr-5" />
                        Nhắn tin với người cho thuê
                    </Button>

                    <CalendarContainer onBook={handleBookCalendar} />
                </div>

                {openMessage ? <MessageContainer data={data} onClose={() => setOpenMessage(!openMessage)} /> : null}
            </div>
        </>
    );
}

export default Contact;
