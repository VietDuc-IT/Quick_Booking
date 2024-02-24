import { Button, Modal, Tooltip } from 'flowbite-react';
import { useState } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { TbInfoTriangleFilled } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { httpRequest } from '~/ultils/httpRequest';

const TableHouseUser = (props) => {
    const { currentUser } = useSelector((state) => state.user);
    const [openModal, setOpenModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState();
    const dispatch = useDispatch();
    let axiosJWT = httpRequest(currentUser, dispatch);

    const handleDeletePost = async () => {
        setOpenModal(false);
        try {
            await axiosJWT.delete(`/post/delete/${postIdToDelete}/${currentUser._id}`, {
                headers: { token: `bearer ${currentUser.accessToken}` },
            });

            props.updateData();

            toast.success('Bài đăng đã xóa thành công!');
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="p-4">
                            <div class="flex items-center">
                                <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label for="checkbox-all-search" class="sr-only">
                                    checkbox
                                </label>
                            </div>
                        </th>
                        <th scope="col" class="px-1 py-3">
                            Bài đăng
                        </th>

                        <th scope="col" class="px-4 py-3">
                            Loại
                        </th>
                        <th scope="col" class="px-4 py-3">
                            Tương tác
                        </th>
                        <th scope="col" class="px-4 py-3">
                            Trạng thái
                        </th>
                        <th scope="col" class="px-4 py-3">
                            Ngày tạo
                        </th>
                        <th scope="col" class="px-4 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((items) => (
                        <>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="w-2 p-4">
                                    <div class="flex items-center">
                                        <input
                                            id="checkbox-table-search-1"
                                            type="checkbox"
                                            class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label for="checkbox-table-search-1" class="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </td>

                                <th
                                    scope="row"
                                    class="flex items-center px-1 py-4 text-gray-900 whitespace-nowrap dark:text-white w-96"
                                >
                                    <img class="w-14 h-10 rounded-sm" src={items.imageUrls} />
                                    <div class="ps-3">
                                        <div className="w-96">
                                            <Tooltip content={items.title}>
                                                <p class="text-base font-semibold truncate w-72">{items.title}</p>
                                            </Tooltip>
                                            <p class="font-normal text-gray-500 truncate w-72">{items.address}</p>
                                        </div>
                                    </div>
                                </th>

                                <td class="px-4 py-4">
                                    <div class="flex items-center w-20">{items.category}</div>
                                </td>
                                <td class="px-4 py-4">
                                    <div className="flex justify-center min-w-20">
                                        50
                                        <AiOutlineComment className="h-5 w-5 ml-3" />
                                    </div>
                                </td>
                                <td class="px-4 py-4">
                                    {/* <div class="flex items-center w-20">Chờ duyệt</div> */}
                                    <div class="flex items-center min-w-20">{items.status}</div>
                                </td>
                                <td class="px-4 py-4">{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td class="px-4 py-4">
                                    <div className="space-x-1 min-w-36">
                                        <button class="font-medium text-green-600 dark:text-green-500 hover:underline">
                                            Xem
                                        </button>
                                        <span>/</span>
                                        <Link to={`/update-post/${items._id}`}>
                                            <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                Sửa
                                            </button>
                                        </Link>
                                        <span>/</span>
                                        <button
                                            onClick={() => {
                                                setOpenModal(true);
                                                setPostIdToDelete(items._id);
                                            }}
                                            class="font-medium text-red-500 dark:text-red-500 hover:underline"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
            {/* =============== Delete =================== */}
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header className="py-3">
                    <div className="flex space-x-3">
                        <TbInfoTriangleFilled className="text-3xl text-red-600" />
                        <p>Xóa bài đăng</p>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p>Bạn chắc chắn muốn xóa bài đăng này?</p> <p>Hành động này không thể khôi phục lại.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-end py-4">
                    <Button color="failure" onClick={handleDeletePost}>
                        Xóa
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Thoát
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TableHouseUser;
