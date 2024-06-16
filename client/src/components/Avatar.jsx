import { Avatar, Dropdown } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutSuccess } from '~/redux/user/userSlice';
import { currentUser } from '~/redux/selectors';
import { HiCog, HiLogout, HiViewGrid } from 'react-icons/hi';
import { FaListAlt, FaUsersCog, FaUserEdit } from 'react-icons/fa';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

function AvatarUser() {
    const User = useSelector(currentUser);
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();

    const handleSignout = async () => {
        try {
            const res = await axiosPrivate.post('/api/user/logout', '', {
                headers: { token: `bearer ${User.accessToken}` },
                withCredentials: true,
            });
            dispatch(signOutSuccess(res.data));
            window.location = '/';
        } catch (err) {
            console.log(err.message);
        }
    };

    const menu = [
        { link: '/history', icon: FaListAlt, name: 'Lịch sử' },
        { link: '/infomation', icon: FaUsersCog, name: 'Cá nhân' },
        // { link: '/setting', icon: HiCog, name: 'Cài đặt' },
    ];
    if (User.role === 'Customer') {
        menu.push({ link: '/newpost', icon: FaUserEdit, name: 'Đăng ký' });
    }
    if (User.role === 'Admin' || User.role === 'User') {
        menu.unshift({ link: '/dashboard', icon: HiViewGrid, name: 'Hệ thống' });
    }

    return (
        <>
            <Dropdown
                arrowIcon={false}
                inline
                label={<Avatar alt="user" size="md" img={User.profilePicture} rounded />}
            >
                <Dropdown.Header>
                    <span className="block text-sm">
                        Xin chào <span className="font-semibold">{User.username}</span>
                    </span>
                    <span className="block text-sm font-medium truncate">{User.email}</span>
                </Dropdown.Header>

                {menu.map(({ link, icon, name }) => (
                    <Link to={link}>
                        <Dropdown.Item icon={icon}>{name}</Dropdown.Item>
                    </Link>
                ))}

                <Dropdown.Divider />
                <Dropdown.Item icon={HiLogout} onClick={handleSignout}>
                    Đăng xuất
                </Dropdown.Item>
            </Dropdown>
        </>
    );
}

export default AvatarUser;
