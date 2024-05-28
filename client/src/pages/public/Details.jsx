import axios from '~/ultils/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductSlider from '~/components/public/ProductSlider';
import FilterTop from '~/components/public/FilterTop';
import CommentSection from '~/components/public/CommentSection';
import Map from '~/components/public/Map';
import Description from '~/components/public/Description';
import Contact from '~/components/public/Contact';
import Message from '~/components/public/message/Message';

function Details() {
    const { id } = useParams();
    const [data, setData] = useState();

    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/post/${id}`);
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <>
            <FilterTop />

            <div className="max-w-7xl mx-auto p-5">
                <div className="grid grid-cols-3 gap-5">
                    {/* Left */}
                    <div className="col-span-2 bg-m_main dark:bg-d_main p-5">
                        {/* Image Slider */}
                        <ProductSlider img={data?.imageUrls} />

                        <Description data={data} />

                        <Map data={data} />

                        <CommentSection />
                    </div>
                    {/* Right */}
                    <div>
                        <Contact data={data?.userId} />
                    </div>
                    <Message data={data?.userId} />
                </div>
            </div>
        </>
    );
}

export default Details;
