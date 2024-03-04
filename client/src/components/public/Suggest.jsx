import Button from '../Button';
import DropDown from '../DropDown';

function Suggest() {
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

    const ground = [
        { id: 1, name: 'Dưới 50' },
        { id: 2, name: '50 - 70' },
        { id: 3, name: '70 - 100' },
        { id: 4, name: '100 - 150' },
        { id: 5, name: '150 - 200' },
        { id: 6, name: '200 - 400' },
        { id: 7, name: '400 - 600' },
        { id: 8, name: 'Trên 600' },
    ];

    const need = [
        { id: 1, name: '1 phòng ngủ' },
        { id: 2, name: '2 phòng ngủ' },
        { id: 3, name: '3 phòng ngủ' },
        { id: 4, name: 'Nội thất cao cấp' },
        { id: 5, name: 'Nội thất đầy đủ' },
        { id: 6, name: 'Phòng trống' },
        { id: 7, name: 'Trong hẻm' },
        { id: 8, name: 'Mặt đường' },
    ];

    return (
        <>
            <div className="max-w-7xl mx-auto px-5 py-3 space-y-3">
                <div className="space-x-3">
                    {area.map(({ id, name }) => (
                        <Button btn="round">{name}</Button>
                    ))}
                </div>
                <div className="space-x-3">
                    Giá :{' '}
                    {price.map(({ id, name }) => (
                        <Button btn="round">{name}</Button>
                    ))}
                </div>
                <div className="space-x-3">
                    Diện tích :{' '}
                    {ground.map(({ id, name }) => (
                        <Button btn="round">
                            {name} <span>m</span>2
                        </Button>
                    ))}
                </div>
                <div className="space-x-3">
                    Nhu cầu :{' '}
                    {need.map(({ id, name }) => (
                        <Button btn="round">{name}</Button>
                    ))}
                </div>
                <div className="flex justify-end">
                    <DropDown />
                </div>
            </div>
        </>
    );
}

export default Suggest;
