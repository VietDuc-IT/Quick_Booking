import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { httpRequest } from '~/ultils/httpRequest';
import axios from '~/ultils/axios';
import BreadCrumb from '~/components/system/BreadCrumb';
import SearchTop from '~/components/system/SearchTop';
import TableHouseAdmin from '~/components/system/TableHouseAdmin';
import TableHouseUser from '~/components/system/TableHouseUser';

function Posts() {
    const { currentUser } = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const dispatch = useDispatch();
    let axiosJWT = httpRequest(currentUser, dispatch);

    useEffect(() => {
        const fetchDataAdmin = async () => {
            try {
                const res = await axios.get('/post/get');
                setData(res.data);
                if (res.data.length < 9) {
                    setShowMore(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        const fetchDataUser = async () => {
            try {
                const res = await axiosJWT.get(`/post/get?userId=${currentUser._id}`, {
                    headers: { token: `bearer ${currentUser.accessToken}` },
                });
                setData(res.data);
                if (res.data.length < 9) {
                    setShowMore(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (currentUser.role === 'Admin') {
            fetchDataAdmin();
        }
        if (currentUser.role === 'User') {
            fetchDataUser();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = data.length;
        if (currentUser.role === 'Admin') {
            try {
                const res = await axiosJWT.get(`/post/get?startIndex=${startIndex}`, {
                    headers: { token: `bearer ${currentUser.accessToken}` },
                });
                setData((prev) => [...prev, ...res.data]);
                if (res.data < 9) {
                    setShowMore(false);
                }
            } catch (err) {
                console.log(err.message);
            }
        }
        if (currentUser.role === 'User') {
            try {
                const res = await axiosJWT.get(`/post/get?userId=${currentUser._id}?startIndex=${startIndex}`, {
                    headers: { token: `bearer ${currentUser.accessToken}` },
                });
                setData((prev) => [...prev, ...res.data]);
                if (res.data < 9) {
                    setShowMore(false);
                }
            } catch (err) {
                console.log(err.message);
            }
        }
    };

    const updateData = () => {
        const fetchDataAdmin = async () => {
            try {
                const res = await axios.get('/post/get');
                setData(res.data);
                if (res.data.length < 9) {
                    setShowMore(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        const fetchDataUser = async () => {
            try {
                const res = await axiosJWT.get(`/post/get?userId=${currentUser._id}`, {
                    headers: { token: `bearer ${currentUser.accessToken}` },
                });
                setData(res.data);
                if (res.data.length < 9) {
                    setShowMore(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (currentUser.role === 'Admin') {
            fetchDataAdmin();
        }
        if (currentUser.role === 'User') {
            fetchDataUser();
        }
    };

    return (
        <>
            <BreadCrumb pageName="Bài đăng" />
            <div>
                <div class="relative overflow-x-auto">
                    <SearchTop />
                    {currentUser.role === 'Admin' ? (
                        <TableHouseAdmin data={data} updateData={updateData} />
                    ) : (
                        <TableHouseUser data={data} updateData={updateData} />
                    )}

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
