import { Dropdown } from 'flowbite-react';

function DropDown({ name, list }) {
    return (
        <>
            <Dropdown label={name} color="light" dismissOnClick={false}>
                {list?.map((index) => (
                    <Dropdown.Item>{index}</Dropdown.Item>
                ))}
            </Dropdown>
        </>
    );
}

export default DropDown;
