import { Button, Checkbox, Modal, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { HiMiniXMark } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import Breadcrumb from '~/components/system/BreadCrumb';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { currentUser } from '~/redux/selectors';
import { toast } from 'react-toastify';
import axios from '~/ultils/axios';

function ListCategory() {
    const User = useSelector(currentUser);
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = useState([]);
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [name, setName] = useState();
    const [tags, setTags] = useState([]);
    const [idEdit, setIdEdit] = useState();

    const fetchData = async () => {
        try {
            const res = await axios.get('/api/category');
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleKeyDown = (e) => {
        if (e.key !== 'Enter') return;
        const value = e.target.value;
        if (!value.trim()) return;
        setTags([...tags, value]);
    };

    const removeTag = (index) => {
        setTags(tags.filter((el, i) => i !== index));
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!name && !tags) {
            return toast.error('Bạn phải điền thông tin!');
        }

        try {
            const res = await axiosPrivate.post(
                '/api/category',
                { name: name, value: tags },
                {
                    headers: { token: `bearer ${User.accessToken}` },
                },
            );

            setOpenNewModal(false);
            toast.success(res.data.message);
            setName();
            setTags([]);
            fetchData();
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                console.log(err.message);
            }
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosPrivate.put(
                `/api/category/${idEdit}`,
                { name: name, value: tags },
                {
                    headers: { token: `bearer ${User.accessToken}` },
                },
            );
            toast.success(res.data.message);
            setOpenEditModal(false);
            setName();
            setTags([]);
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
        const confirm = window.confirm('Bạn chắn chắn muốn xóa!');
        if (confirm) {
            try {
                const res = await axiosPrivate.delete(`/api/category/${id}`, {
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
            <Breadcrumb pageName="Danh mục" />
            <div className="flex justify-end my-4">
                <Button outline gradientDuoTone="greenToBlue" onClick={() => setOpenNewModal(true)}>
                    <IoMdAdd className="mr-2 h-5 w-5" />
                    Thêm mới
                </Button>
            </div>
            <div className="overflow-x-auto">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell className="p-4">
                            <Checkbox />
                        </Table.HeadCell>
                        <Table.HeadCell>Tên danh mục</Table.HeadCell>
                        <Table.HeadCell>Chi tiết</Table.HeadCell>

                        <Table.HeadCell>
                            <span className="sr-only">Action</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y text-nowrap">
                        {data?.map((item) => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item._id}>
                                <Table.Cell className="p-4">
                                    <Checkbox />
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                </Table.Cell>
                                <Table.Cell>
                                    {' '}
                                    {item.value.map((index) => (
                                        <>
                                            {index}
                                            {' ; '}
                                        </>
                                    ))}
                                </Table.Cell>

                                <Table.Cell>
                                    <button class="font-medium text-green-600 dark:text-green-500 hover:underline">
                                        Xem
                                    </button>
                                    {' / '}
                                    <button
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                        onClick={() => {
                                            setOpenEditModal(true);
                                            setIdEdit(item._id);
                                            setName(item.name);
                                            setTags(item.value);
                                        }}
                                    >
                                        Sửa
                                    </button>
                                    {' / '}
                                    <button
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Xóa
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            {/* CREATE */}
            <Modal show={openNewModal} onClose={() => setOpenNewModal(false)}>
                <Modal.Header className="py-3">Thêm mới danh mục</Modal.Header>
                <Modal.Body>
                    <form class="max-w-md mx-auto">
                        <div class="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                id="name"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                for="name"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Tên thể loại
                            </label>
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <input
                                type="value"
                                onKeyDown={handleKeyDown}
                                id="value"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=""
                                required
                            />
                            <p class="mt-2 text-sm text-green-600 dark:text-green-500">Bấm enter để tạo các thẻ tag</p>
                            <label
                                for="value"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Nội dung
                            </label>
                        </div>
                        <div className="flex flex-wrap mb-5 space-x-3">
                            {tags.map((tag, index) => (
                                <Button color="light" className="my-1" pill key={index}>
                                    {tag}
                                    <HiMiniXMark className="ml-2 h-4 w-4" onClick={() => removeTag(index)} />
                                </Button>
                            ))}
                        </div>

                        <Button onClick={handleCreate}>
                            <IoMdAdd className="mr-2 h-5 w-5" /> Thêm mới
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
            {/* EDIT */}
            <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
                <Modal.Header className="py-3">Sửa danh mục</Modal.Header>
                <Modal.Body>
                    <form class="max-w-md mx-auto">
                        <div class="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                id="name"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                for="name"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Tên thể loại
                            </label>
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <input
                                type="value"
                                onKeyDown={handleKeyDown}
                                id="value"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=""
                                required
                            />
                            <p class="mt-2 text-sm text-green-600 dark:text-green-500">Bấm enter để tạo các thẻ tag</p>
                            <label
                                for="value"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Nội dung
                            </label>
                        </div>
                        <div className="flex flex-wrap mb-5 space-x-3">
                            {tags.map((tag, index) => (
                                <Button color="light" className="my-1" pill key={index}>
                                    {tag}
                                    <HiMiniXMark className="ml-2 h-4 w-4" onClick={() => removeTag(index)} />
                                </Button>
                            ))}
                        </div>

                        <Button onClick={handleEdit}>
                            <IoMdAdd className="mr-2 h-5 w-5" /> Sửa
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ListCategory;
