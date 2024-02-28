import React, { useEffect, useState } from 'react';
import Banner from '~/components/public/Banner';
import Cards from '~/components/public/Cards';
import axios from '~/ultils/axios';

function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/post/get');
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {/* BANNER */}
            <Banner />

            {/* <Cards DataHouse={data.Post} /> */}
        </>
    );
}

export default Home;
