import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/system/BreadCrumb';
import SearchTop from '~/components/system/SearchTop';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { currentUser } from '~/redux/selectors';
import { Checkbox, Table, Tooltip } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Posts() {
    const User = useSelector(currentUser);
    const [data, setData] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const axiosPrivate = useAxiosPrivate();

    const fetchData = async () => {
        try {
            const res = await axiosPrivate.get('/api/post/private', {
                headers: { token: `bearer ${User.accessToken}` },
            });
            setData(res.data.Post);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleShowMore = async () => {};

    const handleStatus = async (id) => {
        const post = data.find(({ _id }) => _id === id);
        try {
            const res = await axiosPrivate.put(
                `/api/post/status/abc/${id}`,
                { status: post.status },
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
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm('Bạn chắc chắn muốn xóa bài đăng này?');
        if (confirm) {
            try {
                const res = await axiosPrivate.delete(`/api/post/${id}`, {
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
            <BreadCrumb pageName="Bài đăng" />
            <div>
                <div class="relative overflow-x-auto">
                    <SearchTop />
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <Table.Head className="text-nowrap">
                                <Table.HeadCell className="p-4">
                                    <Checkbox />
                                </Table.HeadCell>
                                <Table.HeadCell>Bài đăng</Table.HeadCell>
                                {User.role === 'Admin' && <Table.HeadCell>Tác giả</Table.HeadCell>}
                                <Table.HeadCell>Loại</Table.HeadCell>
                                <Table.HeadCell>Tương tác</Table.HeadCell>
                                <Table.HeadCell>Trạng thái</Table.HeadCell>
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
                                        <Table.Cell>
                                            <div className="flex">
                                                <img class="w-14 h-10 rounded-sm" src={item.imageUrls} />
                                                <div class="ps-3">
                                                    <div className="w-80">
                                                        <Tooltip content={item.title}>
                                                            <p class="text-base font-semibold truncate w-72">
                                                                {item.title}
                                                            </p>
                                                        </Tooltip>
                                                        <p class="font-normal text-gray-500 truncate w-72">
                                                            {item.address}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        {User.role === 'Admin' && (
                                            <Table.Cell>
                                                <p>{item.userId?.username}</p>
                                                {item.userId?.email}
                                            </Table.Cell>
                                        )}
                                        <Table.Cell>{item.category}</Table.Cell>
                                        <Table.Cell>comment</Table.Cell>
                                        <Table.Cell>{item.status}</Table.Cell>
                                        <Table.Cell>{new Date(item.createdAt).toLocaleDateString()}</Table.Cell>
                                        <Table.Cell>
                                            <button class="font-medium text-green-600 dark:text-green-500 hover:underline">
                                                Xem
                                            </button>

                                            {User._id === item.userId?._id && (
                                                <>
                                                    {' / '}
                                                    <Link to={`/update-post/${item._id}`}>
                                                        <button class="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                            Sửa
                                                        </button>
                                                    </Link>
                                                </>
                                            )}

                                            {User.role === 'Admin' && (
                                                <>
                                                    {' / '}
                                                    <button
                                                        onClick={() => {
                                                            handleStatus(item._id);
                                                        }}
                                                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    >
                                                        {item.status === 'Chờ duyệt' ? 'Duyệt' : 'Vô hiệu'}
                                                    </button>
                                                </>
                                            )}

                                            {' / '}
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                class="font-medium text-red-600 dark:text-red-500 hover:underline"
                                            >
                                                Xóa
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                    {showMore && (
                        <div className="flex justify-center px-6 py-4">
                            <button onClick={handleShowMore} class="font-medium hover:underline">
                                Xem thêm ...
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Posts;
