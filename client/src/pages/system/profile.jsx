import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { TbInfoTriangleFilled } from 'react-icons/tb';
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
import { Link } from 'react-router-dom';

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
            <div className="mb-3 flex justify-end">
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li class="inline-flex items-center">
                            <Link
                                to="/dashboard"
                                class="inline-flex items-center text-sm font-medium hover:text-primary dark:text-d_text dark:hover:text-primary"
                            >
                                <svg
                                    class="w-3 h-3 me-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Home
                            </Link>
                        </li>

                        <li aria-current="page">
                            <div class="flex items-center">
                                <svg
                                    class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                    Profile
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            <div class="flex items-center justify-center bg-m_main dark:bg-d_main">
                <form onSubmit={handleSubmit}>
                    <div class="container lg:w-2/ sm:w-full text-m_text dark:text-d_text shadow-lg transform duration-200 easy-in-out">
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

                        <div class=" ">
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
                                    QuickBooking is one of the leading flight and hotel booking platforms in Southeast
                                    Asia, serving more than 100,000+ flight routes and 100,000+ hotels worldwide. We
                                    work hard to provide our customers with the cheapest hotel and flight rates, every
                                    day!{' '}
                                </p>
                            </div>
                            {/* ====================== BUTTON ======================== */}
                            <div class="flex justify-center px-5 -mt-12">
                                <div className="mt-20 flex flex-col gap-4 justify-center w-3/5">
                                    <TextInput
                                        type="text"
                                        id="username"
                                        placeholder="username"
                                        defaultValue={currentUser.username}
                                        onChange={handleChange}
                                    />
                                    <TextInput
                                        type="email"
                                        id="email"
                                        placeholder="email"
                                        defaultValue={currentUser.email}
                                        onChange={handleChange}
                                    />
                                    <TextInput
                                        type="text"
                                        id="password"
                                        placeholder="password"
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="submit"
                                        class="text-white bg-primary hover:bg-primary6 focus:ring-4 focus:ring-primary3 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary dark:hover:bg-primary6 focus:outline-none dark:focus:ring-primary7"
                                    >
                                        Update
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
                                        <span class="font-semibold">Delete Account</span>
                                    </p>
                                </div>
                                <div class="border"></div>
                                <div
                                    class="text-center w-1/2 p-4 hover:bg-primary cursor-pointer"
                                    onClick={handleSignout}
                                >
                                    <p>
                                        {' '}
                                        <span class="font-semibold">Sign out</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    <div className="flex space-x-3">
                        <TbInfoTriangleFilled className="text-3xl text-red-600" />
                        <p>Delete Account</p>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p>
                            Are you sure you want to delete account <span class="font-bold">{currentUser.email}</span>?
                        </p>{' '}
                        <p>This action cannot be undone.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                    <Button color="failure" onClick={handleDeleteUser}>
                        Delete
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
