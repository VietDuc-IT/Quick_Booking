import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/system/BreadCrumb';
import SearchTop from '~/components/system/SearchTop';
import { toast } from 'react-toastify';
import { Table, Tooltip } from 'flowbite-react';
import { currentUser } from '~/redux/selectors';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

function Bill() {
    const User = useSelector(currentUser);
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axiosPrivate.get(`api/schedule`, {
                headers: { token: `bearer ${User.accessToken}` },
            });
            setData(res.data?.schedule);
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                console.log(err.message);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStatus = async (id) => {
        const schedule = data.find(({ _id }) => _id === id);

        if (schedule.status === 'Hũy lịch') {
            const confirm = window.confirm('Bạn chắc chắn muốn hũy lịch hẹn này?');
            if (confirm) {
                try {
                    await axiosPrivate.put(
                        `/api/schedule/v1/status/${id}`,
                        { status: schedule.status },
                        {
                            headers: { token: `bearer ${User.accessToken}` },
                        },
                    );

                    toast.success('Bạn hũy lịch hẹn thành công!');
                    fetchData();
                } catch (err) {
                    if (err.response) {
                        toast.error(err.response.data.message);
                    } else {
                        console.log(err.message);
                    }
                }
            }
        } else {
            try {
                const res = await axiosPrivate.put(
                    `/api/schedule/v1/status/${id}`,
                    { status: schedule.status },
                    {
                        headers: { token: `bearer ${User.accessToken}` },
                    },
                );

                toast.success(res.data.message);
                fetchData();
            } catch (err) {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    console.log(err.message);
                }
            }
        }
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm('Bạn chắc chắn muốn xóa lịch hẹn này?');
        if (confirm) {
            try {
                const res = await axiosPrivate.delete(`/api/schedule/${id}`, {
                    headers: { token: `bearer ${User.accessToken}` },
                });
                toast.success(res.data.message);
                fetchData();
            } catch (err) {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    console.log(err.message);
                }
            }
        }
    };

    return (
        <>
            <BreadCrumb pageName="Môi giới" />

            <div>
                <div class="relative overflow-x-auto">
                    <SearchTop />
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <Table.Head>
                                {/* <Table.HeadCell className="p-4">
                                    <Checkbox />
                                </Table.HeadCell> */}
                                <Table.HeadCell>Bài đăng</Table.HeadCell>
                                <Table.HeadCell>Người thuê</Table.HeadCell>
                                <Table.HeadCell>Ngày đặt</Table.HeadCell>
                                <Table.HeadCell>Ngày/giờ hẹn</Table.HeadCell>

                                <Table.HeadCell>
                                    <span className="sr-only">Action</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y text-nowrap">
                                {data?.map((item) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        {/* <Table.Cell className="p-4">
                                            <Checkbox />
                                        </Table.Cell> */}
                                        <Table.Cell>
                                            <div className="flex">
                                                <img class="w-14 h-10 rounded-sm" src={item.postId.imageUrls} />
                                                <div class="ps-3">
                                                    <div className="w-80">
                                                        <Tooltip content={item.postId.title}>
                                                            <p class="text-base font-semibold truncate w-72">
                                                                {item.postId.title}
                                                            </p>
                                                        </Tooltip>
                                                        <p class="font-normal text-gray-500 truncate w-72">
                                                            {item.hostId.username}
                                                            {'    -   '}
                                                            {item.hostId.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <p class="text-base font-normal">
                                                {item.renterId.username}
                                                {' - '}
                                                {item.renterId.email}
                                            </p>

                                            {item.renterId.phoneNumber}
                                        </Table.Cell>

                                        <Table.Cell>{new Date(item.createdAt).toLocaleDateString()}</Table.Cell>
                                        <Table.Cell>
                                            {item.date}
                                            <br></br>
                                            {item.time.map((item) => (
                                                <>
                                                    {' '}
                                                    {item}
                                                    {','}
                                                </>
                                            ))}
                                        </Table.Cell>

                                        <Table.Cell>
                                            {User._id === item.hostId?._id && (
                                                <button
                                                    onClick={() => {
                                                        handleStatus(item._id);
                                                    }}
                                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                >
                                                    {item.status === 'Chờ duyệt' ? 'Chờ duyệt' : 'Hũy lịch'}
                                                </button>
                                            )}
                                            {User._id !== item.hostId?._id && (
                                                <button class="font-medium text-green-600 dark:text-green-500 cursor-not-allowed">
                                                    {item.status === 'Chờ duyệt' ? 'Chờ duyệt' : 'Hũy lịch'}
                                                </button>
                                            )}

                                            {' / '}
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                class="font-medium text-red-500 dark:text-red-500 hover:underline"
                                            >
                                                Xóa
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Bill;
