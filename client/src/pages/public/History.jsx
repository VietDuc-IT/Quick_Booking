import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/system/BreadCrumb';
import SearchTop from '~/components/system/SearchTop';
import { toast } from 'react-toastify';
import { Avatar, Checkbox, Dropdown, Table, Tooltip } from 'flowbite-react';
import { currentUser } from '~/redux/selectors';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

function History() {
    const User = useSelector(currentUser);
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axiosPrivate.get(`api/schedule/${User._id}`, {
                headers: { token: `bearer ${User.accessToken}` },
            });
            setData(res.data);
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
            <div>
                <div class="relative overflow-x-auto p-5 min-h-[500px]">
                    <SearchTop />
                    {data.length > 0 ? (
                        ''
                    ) : (
                        <div className="flex justify-center items-center">
                            <p className="font-normal">Bạn chưa đặt lịch hẹn nào.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default History;
