import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { httpRequest } from '~/ultils/httpRequest';
import BreadCrumb from '~/components/system/BreadCrumb';
import SearchTop from '~/components/system/SearchTop';
import { toast } from 'react-toastify';
import { Button, Modal } from 'flowbite-react';
import { TbInfoTriangleFilled } from 'react-icons/tb';

function User() {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');
    const dispatch = useDispatch();

    // Refresh Token
    let axiosJWT = httpRequest(currentUser, dispatch);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosJWT.get('/user', {
                    headers: { token: `bearer ${currentUser.accessToken}` },
                });
                setUsers(res.data.users);
            } catch (err) {
                console.log(err.message);
            }
        };
        if (currentUser.role === 'Admin') {
            fetchData();
        } else {
            console.log('abc');
        }
    }, []);

    const handleDeleteUser = async () => {
        setOpenModal(false);
        try {
            await axiosJWT.delete(`/user/delete/${userIdToDelete}`, {
                headers: { token: `bearer ${currentUser.accessToken}` },
            });

            setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));

            toast.success('Xóa tài khoản thành công!');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <BreadCrumb pageName="Người dùng" />

            <div>
                <div class="relative overflow-x-auto">
                    <SearchTop />
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
                                <th scope="col" class="px-6 py-3">
                                    Tên & email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Số điện thoại
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Quyền
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Trạng thái
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Ngày tạo
                                </th>
                                <th scope="col" class="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="w-4 p-4">
                                            <div class="flex items-center">
                                                <input
                                                    id="checkbox-table-search-1"
                                                    type="checkbox"
                                                    class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label for="checkbox-table-search-1" class="sr-only">
                                                    {currentUser.id}
                                                </label>
                                            </div>
                                        </td>

                                        <th
                                            scope="row"
                                            class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            <img class="w-10 h-10 rounded-full" src={user.profilePicture} />
                                            <div class="ps-3">
                                                <div class="text-base font-semibold">{user.username}</div>
                                                <div class="font-normal text-gray-500">{user.email}</div>
                                            </div>
                                        </th>
                                        <td class="px-6 py-4">
                                            {user.phoneNumber === 0 ? '' : <>0{user.phoneNumber}</>}
                                        </td>
                                        <td class="px-6 py-4">{user.role}</td>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td class="px-6 py-4">
                                            <button
                                                onClick={() => {
                                                    setOpenModal(true);
                                                    setUserIdToDelete(user._id);
                                                }}
                                                class="font-medium text-red-500 dark:text-red-500 hover:underline"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header className="py-3">
                    <div className="flex space-x-3">
                        <TbInfoTriangleFilled className="text-3xl text-red-600" />
                        <p>Xóa tài khoản</p>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p>Bạn chắc chắn muốn xóa người dùng này?</p> <p>Hành động này không thể khôi phục lại.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-end py-4">
                    <Button color="failure" onClick={handleDeleteUser}>
                        Xóa
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Thoát
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default User;
