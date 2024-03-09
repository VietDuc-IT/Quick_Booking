import axios from '~/ultils/axios';
import React, { useEffect, useState } from 'react';
import Button from '~/components/Button';
import Cards from '~/components/public/CardProduct';
import FilterTop from '~/components/public/FilterTop';
import Suggest from '~/components/public/Suggest';

function Product() {
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/post');
                setData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            {/* Filter Top */}
            <FilterTop />

            {/* Suggest */}
            <Suggest />

            {/* Card Product */}
            <div className="w-full">
                <div className="p-5 max-w-7xl mx-auto">
                    <Cards Data={data?.Post} />
                    <div className="flex justify-center items-center mt-7">
                        <Button btn="outline">Xem thêm ...</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;
