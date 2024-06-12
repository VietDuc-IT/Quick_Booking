import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { TbInfoTriangleFilled } from 'react-icons/tb';
import { FaLock, FaUser } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '~/ultils/firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch } from 'react-redux';
import {
    signInSuccess,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOutSuccess,
} from '~/redux/user/userSlice';
import BreadCrumb from '~/components/system/BreadCrumb';
import { FaPhone, FaRightFromBracket } from 'react-icons/fa6';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { currentUser } from '~/redux/selectors';
import { HiMail } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';

export default function Profile() {
    const User = useSelector(currentUser);
    const axiosPrivate = useAxiosPrivate();
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [formData, setFormData] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const filePickerRef = useRef();
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read;
        //         allow write: if
        //         request.resource.size <2*1024*1024 &&
        //         request.resource.contentType.matches('image/.*')
        //       }
        //     }
        //   }
        setErrorMessage(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setErrorMessage('Kích thước ảnh phải nhỏ hơn 2MB!');
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                });
            },
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const res = await axiosPrivate.put(`/api/user/${User._id}`, formData, {
                headers: { token: `bearer ${User.accessToken}` },
            });

            dispatch(signInSuccess(res.data));
            setImageFileUploadProgress(null);
            setErrorMessage(null);
            setIsLoading(false);
            toast.success(res.data.message);
        } catch (err) {
            setIsLoading(false);
            if (err.response) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage(err.message);
            }
        }
    };

    const handleDeleteUser = async () => {
        setOpenModal(false);
        dispatch(deleteUserStart());

        try {
            const res = await axiosPrivate.delete('/api/user/' + User._id, {
                headers: { token: `bearer ${User.accessToken}` },
                withCredentials: true,
            });

            dispatch(deleteUserSuccess(res.data));
        } catch (err) {
            dispatch(deleteUserFailure(err.message));
        }
    };

    const handleSignout = async () => {
        try {
            const res = await axiosPrivate.post('/api/user/logout', '', {
                headers: { token: `bearer ${User.accessToken}` },
            });

            dispatch(signOutSuccess(res.data));
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <>
            <BreadCrumb pageName="Cá nhân" />
            <div class="flex items-center justify-center bg-m_main dark:bg-d_main shadow-lg">
                <form onSubmit={handleSubmit}>
                    <div class="container sm:w-full transform duration-200 mb-5">
                        <div class=" h-52 overflow-hidden">
                            <img
                                class="w-full"
                                src="https://ik.imagekit.io/tvlk/image/imageResource/2023/09/27/1695776209619-17a750c3f514f7a8cccde2d0976c902a.png?tr=q-75"
                                alt=""
                            />
                        </div>
                        <input hidden type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} />
                        {/* Image */}
                        <div class="flex justify-center px-5 -mt-12">
                            <div className="relative">
                                {imageFileUploadProgress && (
                                    <CircularProgressbar
                                        value={imageFileUploadProgress || 0}
                                        text={`${imageFileUploadProgress}%`}
                                        strokeWidth={5}
                                        styles={{
                                            root: {
                                                width: '144',
                                                height: '144',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                            },
                                            path: {
                                                stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                                            },
                                        }}
                                    />
                                )}
                                <img
                                    class={`h-36 w-36 bg-white p-2 rounded-full cursor-pointer ${
                                        imageFileUploadProgress && imageFileUploadProgress < 100
                                    }`}
                                    src={imageFileUrl || User.profilePicture}
                                    alt=""
                                    onClick={() => filePickerRef.current.click()}
                                />
                            </div>
                        </div>

                        <div>
                            <div class="text-center px-14 mt-5">
                                <h2 class="text-3xl font-bold">{User.username}</h2>
                                {User.email}
                                <p class="mt-2 text-gray-500 text-sm">
                                    QuickBooking là nơi người cho thuê dễ dàng đăng tải những tin rao nhà thuê một cách
                                    dễ dàng với đầy đủ thông tin với giá cả và liên hệ rõ ràng. Từ đó sẽ giúp người tìm
                                    nhà thuê dễ dàng tìm kiếm và lựa chọn cho mình những căn nhà thuê ưng ý, phù hợp nhu
                                    cầu sử dụng với mức giá tốt.!{' '}
                                </p>
                            </div>
                            {/* ====================== BUTTON ======================== */}
                            <div class="flex justify-center px-5 -mt-12">
                                <div className="mt-20 flex flex-col gap-7 w-3/5">
                                    {errorMessage && <Alert color="failure">{errorMessage}</Alert>}
                                    {/* ========= Username ======== */}
                                    <TextInput
                                        type="text"
                                        id="username"
                                        icon={FaUser}
                                        placeholder="username"
                                        defaultValue={User.username}
                                        onChange={handleChange}
                                    />
                                    {/* ========= Email ======== */}
                                    <TextInput
                                        id="email"
                                        type="email"
                                        icon={HiMail}
                                        defaultValue={User.email}
                                        onChange={handleChange}
                                    />
                                    {/* ========= Password ======== */}
                                    <TextInput
                                        type="text"
                                        id="password"
                                        icon={FaLock}
                                        placeholder="Mật khẩu phải có ít nhất 6 kí tự ..."
                                        onChange={handleChange}
                                    />
                                    {/* ========= Phone Number ======== */}
                                    <TextInput
                                        type="text"
                                        id="phone"
                                        icon={FaPhone}
                                        placeholder="Số điện thoại ..."
                                        defaultValue={User?.phoneNumber && `0${User.phoneNumber}`}
                                        onChange={handleChange}
                                    />
                                    {isLoading ? (
                                        <Button color="success" size="lg" type="onSubmit">
                                            <svg
                                                aria-hidden="true"
                                                role="status"
                                                class="inline w-4 h-4 me-3 text-white animate-spin"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="#E5E7EB"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            Loading ...
                                        </Button>
                                    ) : (
                                        <Button color="success" size="lg" type="onSubmit">
                                            Cập nhật
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/* End */}
            <div>
                <hr class="mt-6" />
                <div class="flex text-white">
                    <div
                        class="text-center w-1/2 p-4 bg-green-600 hover:bg-green-700 cursor-pointer"
                        onClick={() => setOpenModal(true)}
                    >
                        <div className="flex justify-center">
                            <MdDelete className="mt-0.5 text-lg mr-2" />
                            <span class="text-base font-medium">Xóa tài khoản</span>
                        </div>
                    </div>
                    <div class="border"></div>
                    <div
                        class="text-center w-1/2 p-4 bg-green-600 hover:bg-green-700 cursor-pointer"
                        onClick={handleSignout}
                    >
                        <div className="flex justify-center">
                            <span class="text-base font-medium">Đăng xuất</span>
                            <FaRightFromBracket className="mt-0.5 text-lg ml-2" />
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header className="py-3">
                    <div className="flex space-x-3">
                        <TbInfoTriangleFilled className="text-3xl text-red-600" />
                        <p>Xóa tài khoản</p>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p>
                            Bạn chắc chắn muốn xóa tài khoản <span class="font-bold">{User.email}</span> này?
                        </p>{' '}
                        <p>Hành động này không thể khôi phục lại.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-end py-4">
                    <Button color="failure" onClick={handleDeleteUser}>
                        Xóa tài khoản
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Thoát
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
