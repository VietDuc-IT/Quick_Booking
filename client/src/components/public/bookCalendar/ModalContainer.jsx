import { Modal } from 'flowbite-react';
import { useState } from 'react';
import { IoCalendarSharp } from 'react-icons/io5';
import Button from '../../Button';
import { Datepicker } from 'flowbite-react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { currentUser } from '~/redux/selectors';

function Container({ onBook }) {
    const User = useSelector(currentUser);
    const [openModal, setOpenModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimes, setSelectedTimes] = useState([]);

    const toggleTimeSelection = (item) => {
        setSelectedTimes((prevSelectedTimes) => {
            if (prevSelectedTimes.includes(item)) {
                // Remove the time if it's already selected
                return prevSelectedTimes.filter((time) => time !== item);
            } else if (prevSelectedTimes.length < 3) {
                // Add the time if it's not already selected and less than 3 are selected
                return [...prevSelectedTimes, item];
            } else {
                // Limit reached, do nothing or show a message
                alert('Bạn không được phép chọn quá 3 khung giờ.');
                return prevSelectedTimes;
            }
        });
    };

    const handleDatePickerChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedDate || !selectedTimes || selectedTimes.length === 0) {
            toast.error('Bạn phải chọn ngày và giờ!');
        } else {
            onBook({ date: selectedDate, time: selectedTimes });
            setSelectedDate(null);
            setSelectedTimes([]);
            setOpenModal(false);
        }
    };

    const time = [
        '8:00 - 9:00',
        '9:00 - 10:00',
        '10:00 - 11:00',
        '13:00 - 14:00',
        '14:00 - 15:00',
        '15:00 - 16:00',
        '16:00 - 17:00',
        '17:00 - 18:00',
    ];

    const handelOpenModal = () => {
        if (User) {
            setOpenModal(true);
        } else {
            toast.error('Bạn cần đăng nhập để đặt lịch!');
        }
    };

    return (
        <>
            <Button btn="dark" className="w-full flex justify-center items-center" onClick={handelOpenModal}>
                <IoCalendarSharp className="h-6 w-6 mr-5" />
                Đặt lịch xem phòng
            </Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header className="h-14">Đặt lịch</Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="grid grid-cols-2">
                            <Datepicker
                                inline
                                labelTodayButton="Hôm nay"
                                labelClearButton="Làm mới"
                                // value={selectedDate}
                                onSelectedDateChanged={handleDatePickerChange}
                            />
                            <div className="flex flex-col justify-center items-center">
                                <p className="mb-7 text-lg font-medium">Chọn khung giờ</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {time.map((item) => (
                                        <div
                                            key={item}
                                            className={classNames(
                                                'py-1.5 px-4 text-sm font-semibold border-primary-default text-primary-default hover:shadow-sm hover:shadow-primary-default cursor-pointer rounded border-2',
                                                {
                                                    'bg-primary-default hover:bg-primary-hover text-white':
                                                        selectedTimes.includes(item),
                                                },
                                            )}
                                            onClick={() => toggleTimeSelection(item)}
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button btn="primary" type="submit">
                            Xác nhận
                        </Button>
                        <Button btn="dark" onClick={() => setOpenModal(false)}>
                            Thoát
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default Container;
