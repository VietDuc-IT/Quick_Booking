import React, { useEffect, useRef, useState } from 'react';
import Banner from '~/components/public/Banner';
import Cards from '~/components/public/CardProduct';
import axios from '~/ultils/axios';
import { useFetch } from '~/hooks/useFetch';
import Search from '~/components/Search';
import DropDown from '~/components/DropDown';
import Button from '~/components/Button';
import Avatar from '~/components/Avatar';
import Header from '~/components/public/Header';

function Home() {
    const [data, setData] = useState();
    const ref = useRef('Bình thường');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const status = 'Bình thường';
                const res = await axios.get(`/post/get?status=${status}`);
                setData(res.data.Post);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    // const { data: data, isLoading, error } = useFetch(`/post/get?status=${ref}`);
    // if (error) {
    //     return 'Something wrong!!!';
    // }
    // return isLoading ? (
    //     <p>Loading...</p>
    //   ) : (
    //     users.map((user) => (
    //       <p>
    //         {user.first_name} {user.last_name}
    //       </p>
    //     ))
    //   );
    const area = [
        { id: 1, name: 'TP Hồ Chí Minh' },
        { id: 2, name: 'Hà Nội' },
        { id: 3, name: 'Đà Nẵng' },
        { id: 4, name: 'Cần Thơ' },
        { id: 5, name: 'Bình Dương' },
        { id: 6, name: 'Bình Phước' },
        { id: 7, name: 'Đắk Lắk' },
        { id: 8, name: 'Bình Định' },
        { id: 9, name: 'Bình Thuận' },
    ];

    const price = [
        { id: 1, name: 'Dưới 5 triệu' },
        { id: 2, name: '5 - 10 triệu' },
        { id: 3, name: '10 - 15 triệu' },
        { id: 4, name: '15 - 20 triệu' },
        { id: 5, name: '20 - 25 triệu' },
        { id: 6, name: '25 - 30 triệu' },
        { id: 7, name: '30 - 40 triệu' },
        { id: 8, name: '40 - 50 triệu' },
        { id: 9, name: 'Trên 50 triệu' },
    ];

    return (
        <>
            {/* BANNER */}
            <Banner />

            {/* Search */}
            <div className="flex justify-center -translate-y-8 relative z-10">
                <div className="flex bg-m_main dark:bg-d_main py-4 px-7 space-x-5 items-center rounded-lg">
                    <Search />
                    <DropDown name="Vị trí" list={area} />
                    <DropDown name="Mức giá" list={price} />
                    <Button btn="primary">Tìm kiếm</Button>
                </div>
            </div>

            {/* Home card */}
            <div className="w-full">
                <div className="p-5 max-w-7xl mx-auto">
                    <div className="mb-5">
                        <span className="text-xl text-primary-default font-semibold">Căn nhà tốt nhất</span>
                    </div>
                    <Cards DataHouse={data} />
                    <div className="flex justify-center items-center mt-7">
                        <Button btn="outline">Xem thêm ...</Button>
                    </div>
                </div>
            </div>

            {/* Renter card */}
            <div className="w-full bg-m_main dark:bg-d_main">
                <div className="p-5 max-w-7xl mx-auto">
                    <div className="mb-5">
                        <span className="text-xl text-primary-default font-semibold">Chủ nhà được ưa thích nhất</span>
                    </div>
                    <Cards DataHouse={data} />
                    <div className="flex justify-center items-center mt-7">
                        <Button btn="outline">Xem thêm ...</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
