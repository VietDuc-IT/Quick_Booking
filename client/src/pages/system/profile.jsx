import { Alert, Button, Modal } from 'flowbite-react';
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
    updateStart,
    updateSuccess,
    updateFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOutSuccess,
} from '~/redux/user/userSlice';
import { httpRequest } from '~/ultils/httpRequest';
import BreadCrumb from '~/components/system/BreadCrumb';
import { FaPhone } from 'react-icons/fa6';

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const filePickerRef = useRef();
    const dispatch = useDispatch();
    // Refresh Token
    let axiosJWT = httpRequest(currentUser, dispatch);

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
        setImageFileUploadError(null);
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
                setImageFileUploadError('Could not upload image (File must be less than 2MB)');
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                //   setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                    // onChange = { handleChange };
                    // setImageFileUploading(false);
                });
            },
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (Object.keys(formData).length === 0) {
        //     return;
        // }

        try {
            dispatch(updateStart());
            const res = await axiosJWT.put(`/auth/update/${currentUser._id}`, formData, {
                headers: { token: `bearer ${currentUser.accessToken}` },
            });

            dispatch(updateSuccess(res.data));
        } catch (err) {
            dispatch(updateFailure(err.message));
        }
    };

    const handleDeleteUser = async () => {
        setOpenModal(false);
        try {
            dispatch(deleteUserStart());
            const res = await axiosJWT.delete('/user/delete/' + currentUser._id, {
                headers: { token: `bearer ${currentUser.accessToken}` },
                withCredentials: true,
            });
            dispatch(deleteUserSuccess(res.data));
        } catch (err) {
            dispatch(deleteUserFailure(err.message));
        }
    };

    const handleSignout = async () => {
        try {
            const res = await axiosJWT.post('/auth/logout', '', {
                headers: { token: `bearer ${currentUser.accessToken}` },
            });
            dispatch(signOutSuccess(res.data));
            window.location = '/';
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <>
            <BreadCrumb pageName="Cá nhân" />
            <div class="flex items-center justify-center bg-m_main dark:bg-d_main">
                <form onSubmit={handleSubmit}>
                    <div class="container sm:w-full text-m_text dark:text-d_text shadow-lg transform duration-200">
                        <div class=" h-52 overflow-hidden">
                            <img
                                class="w-full"
                                src="https://ik.imagekit.io/tvlk/image/imageResource/2023/09/27/1695776209619-17a750c3f514f7a8cccde2d0976c902a.png?tr=q-75"
                                alt=""
                            />
                        </div>
                        <input hidden type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} />
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
                                    src={imageFileUrl || currentUser.profilePicture}
                                    alt=""
                                    onClick={() => filePickerRef.current.click()}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center my-3">
                            {imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>}
                        </div>

                        <div>
                            <div class="text-center px-14">
                                <h2 class="text-3xl font-bold">{currentUser.username}</h2>
                                <a
                                    class="mt-2 hover:text-primary"
                                    href="https://www.instagram.com/immohitdhiman/"
                                    target="BLANK()"
                                >
                                    {currentUser.email}
                                </a>
                                <p class="mt-2 text-gray-500 text-sm">
                                    QuickBooking là nơi người cho thuê dễ dàng đăng tải những tin rao nhà thuê một cách
                                    dễ dàng với đầy đủ thông tin với giá cả và liên hệ rõ ràng. Từ đó sẽ giúp người tìm
                                    nhà thuê dễ dàng tìm kiếm và lựa chọn cho mình những căn nhà thuê ưng ý, phù hợp nhu
                                    cầu sử dụng với mức giá tốt.!{' '}
                                </p>
                            </div>
                            {/* ====================== BUTTON ======================== */}
                            <div class="flex justify-center px-5 -mt-12">
                                <div className="mt-20 flex flex-col gap-4 justify-center w-3/5">
                                    {/* ========= Username ======== */}
                                    <div class="relative mb-2">
                                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <FaUser class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="username"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                                            placeholder="username"
                                            defaultValue={currentUser.username}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* ========= Email ======== */}
                                    <div class="relative mb-2">
                                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg
                                                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 16"
                                            >
                                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                                            placeholder="email"
                                            defaultValue={currentUser.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* ========= Password ======== */}
                                    <div class="relative mb-2">
                                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <FaLock class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="password"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                                            placeholder="Mật khẩu phải có ít nhất 6 kí tự ..."
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* ========= Phone Number ======== */}
                                    <div class="relative mb-2">
                                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <FaPhone class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="phone"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                                            placeholder="Số điện thoại ..."
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        class="text-white bg-primary hover:bg-primary6 focus:ring-4 focus:ring-primary3 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-primary dark:hover:bg-primary6 focus:outline-none dark:focus:ring-primary7"
                                    >
                                        Cập nhật
                                    </button>
                                </div>
                            </div>
                            <hr class="mt-6" />

                            <div class="flex">
                                <div
                                    class="text-center w-1/2 p-4 hover:bg-primary cursor-pointer"
                                    onClick={() => setOpenModal(true)}
                                >
                                    <p>
                                        {' '}
                                        <span class="font-semibold">Xóa tài khoản</span>
                                    </p>
                                </div>
                                <div class="border"></div>
                                <div
                                    class="text-center w-1/2 p-4 hover:bg-primary cursor-pointer"
                                    onClick={handleSignout}
                                >
                                    <p>
                                        {' '}
                                        <span class="font-semibold">Đăng xuất</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
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
                            Bạn chắc chắn muốn xóa tài khoản <span class="font-bold">{currentUser.email}</span> này?
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
