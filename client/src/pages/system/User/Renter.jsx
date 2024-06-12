import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/system/BreadCrumb';
import SearchTop from '~/components/system/SearchTop';
import { toast } from 'react-toastify';
import { Avatar, Checkbox, Dropdown, Table } from 'flowbite-react';
import { currentUser } from '~/redux/selectors';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

function Host() {
    const User = useSelector(currentUser);
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axiosPrivate.get('/api/renter/sign', {
                headers: { token: `bearer ${User.accessToken}` },
            });

            setData(res.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleConfirm = async (id) => {
        try {
            const res = await axiosPrivate.put(`api/renter/confirm/${id}`, null, {
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
    };

    const handleRemove = async (id) => {
        try {
            const res = await axiosPrivate.put(`api/renter/remove/${id}`, null, {
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
    };

    return (
        <>
            <div>
                <div class="relative overflow-x-auto">
                    <SearchTop />
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell className="p-4">
                                    <Checkbox />
                                </Table.HeadCell>
                                <Table.HeadCell>Tên & Email</Table.HeadCell>
                                <Table.HeadCell>Số điện thoại</Table.HeadCell>
                                <Table.HeadCell>Quyền</Table.HeadCell>

                                <Table.HeadCell>Ngày tạo</Table.HeadCell>
                                <Table.HeadCell>
                                    <span className="sr-only">Action</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y text-nowrap">
                                {data?.map((item) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="p-4">
                                            <Checkbox />
                                        </Table.Cell>
                                        <Table.Cell className="flex">
                                            <Avatar img={item.profilePicture} rounded>
                                                <div className="space-y-1 font-medium dark:text-white">
                                                    <div>{item.username}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {item.email}
                                                    </div>
                                                </div>
                                            </Avatar>
                                        </Table.Cell>
                                        <Table.Cell>{item.phoneNumber && `0${item.phoneNumber}`}</Table.Cell>
                                        <Table.Cell>{item.role}</Table.Cell>

                                        <Table.Cell>{new Date(item.createdAt).toLocaleDateString()}</Table.Cell>

                                        <Table.Cell>
                                            <button
                                                onClick={() => handleConfirm(item._id)}
                                                class="font-medium text-green-500 dark:text-green-500 hover:underline"
                                            >
                                                Cho phép
                                            </button>
                                            {' / '}

                                            <button
                                                onClick={() => handleRemove(item._id)}
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

export default Host;
