import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'flowbite-react';
import { AiFillCaretUp } from 'react-icons/ai';
import { HiOutlineHome } from 'react-icons/hi';
import { BsHouseCheck, BsCalendar2Date } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';
import axios from '~/ultils/axios';
import { httpRequest } from '~/ultils/httpRequest';

const Card = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const dispatch = useDispatch();
    let axiosJWT = httpRequest(currentUser, dispatch);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosJWT.get('/user?limit=5', {
                    headers: { token: `bearer ${currentUser.accessToken}` },
                });
                setUsers(res.data.users);
                setTotalUsers(res.data.totalUsers);
                setLastMonthUsers(res.data.lastMonthUsers);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchPosts = async () => {
            try {
                const res = await axios.get('/post/get?limit=5');
                setPosts(res.data.posts);
                setTotalPosts(res.data.totalPosts);
                setLastMonthPosts(res.data.lastMonthPosts);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
        fetchPosts();
    }, []);

    return (
        <div class="grid grid-cols-4 gap-6 mb-4">
            {/* Posts */}
            <div class="items-center justify-center h-36 rounded bg-gray-50 dark:bg-gray-800 p-5">
                <div className="ml-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                        <HiOutlineHome className="text-primary text-2xl" />
                    </div>
                </div>

                <div className="mt-3 flex justify-between">
                    <div>
                        <h4 className="text-lg font-bold text-black dark:text-white text-center">{totalPosts}</h4>
                        <span className="text-sm font-medium">Tổng bài đăng</span>
                    </div>
                    <div className="bg-primary h-7 w-16 flex justify-center rounded-full mt-5">
                        <Tooltip content="Bài đăng trong tháng">
                            <span className="text-lg flex text-white">
                                {lastMonthPosts} <AiFillCaretUp className="mt-1 ml-1" />
                            </span>
                        </Tooltip>
                    </div>
                </div>
            </div>
            {/* User */}
            <div class="items-center justify-center h-36 rounded bg-gray-50 dark:bg-gray-800 p-5">
                <div className="ml-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                        <FaRegUser className="text-primary text-2xl" />
                    </div>
                </div>

                <div className="mt-3 flex justify-between">
                    <div>
                        <h4 className="text-lg font-bold text-black dark:text-white text-center">{totalUsers}</h4>
                        <span className="text-sm font-medium">Tổng đăng kí</span>
                    </div>
                    <div className="bg-primary h-7 w-16 flex justify-center rounded-full mt-5">
                        <Tooltip content="Đăng kí trong tháng">
                            <span className="text-lg flex text-white">
                                {lastMonthUsers} <AiFillCaretUp className="mt-1 ml-1" />
                            </span>
                        </Tooltip>
                    </div>
                </div>
            </div>

            {/* Booking */}
            <div class="items-center justify-center h-36 rounded bg-gray-50 dark:bg-gray-800 p-5">
                <div className="ml-7">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                        <BsHouseCheck className="text-primary text-2xl" />
                    </div>
                </div>

                <div className="mt-3 flex justify-between">
                    <div>
                        <h4 className="text-lg font-bold text-black dark:text-white text-center">{totalPosts}</h4>
                        <span className="text-sm font-medium">Tổng thanh toán</span>
                    </div>
                    <div className="bg-primary h-7 w-16 flex justify-center rounded-full mt-5">
                        <Tooltip content="Thanh toán trong tháng">
                            <span className="text-lg flex text-white">
                                {lastMonthPosts} <AiFillCaretUp className="mt-1 ml-1" />
                            </span>
                        </Tooltip>
                    </div>
                </div>
            </div>
            {/* Calendar Date */}
            <div class="items-center justify-center h-36 rounded bg-gray-50 dark:bg-gray-800 p-5">
                <div className="ml-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                        <BsCalendar2Date className="text-primary text-2xl" />
                    </div>
                </div>

                <div className="mt-3 flex justify-between">
                    <div>
                        <h4 className="text-lg font-bold text-black dark:text-white text-center">{totalPosts}</h4>
                        <span className="text-sm font-medium">Tổng lịch hẹn</span>
                    </div>
                    <div className="bg-primary h-7 w-16 flex justify-center rounded-full mt-5">
                        <Tooltip content="Lịch hẹn trong tháng">
                            <span className="text-lg flex text-white">
                                {lastMonthPosts} <AiFillCaretUp className="mt-1 ml-1" />
                            </span>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
