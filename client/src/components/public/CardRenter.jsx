import Button from '../Button';

function CardRenter({ data }) {
    const phone = (number) => {
        const str = number?.toString();
        const replace = '***';
        return str?.slice(0, -3) + replace;
    };

    return (
        <>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-auto gap-4">
                {data?.map((item) => (
                    <section
                        key={item?.id}
                        class="mb-2 border p-4 rounded-lg dark:border-d_main max-w-full bg-m_body dark:bg-d_body"
                    >
                        <div class="mx-auto">
                            <div class="card md:flex max-w-lg">
                                <div class="w-14 h-14 my-auto md:mr-6 flex-shrink-0">
                                    <img class="object-cover rounded-full" src={item?.profilePicture} />
                                </div>

                                <div class="flex-grow text-center md:text-left">
                                    <h3 class="text-xl font-bold heading">{item?.username}</h3>
                                    <p class="font-bold">{phone(item?.phoneNumber)}</p>
                                    <p class="mt-2 mb-3">Khu vực: Thủ Đức</p>

                                    <div className="space-x-7">
                                        <Button btn="outline" to="/renter">
                                            Liên hệ
                                        </Button>
                                        <Button btn="primary" to="/renter">
                                            Xem 70 tin
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </>
    );
}

export default CardRenter;
