import { Textarea } from 'flowbite-react';
import { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { currentUser } from '~/redux/selectors';
import Button from '../Button';
import { toast } from 'react-toastify';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

function Comment({ comment, onLike, onEdit, onDelete }) {
    const User = useSelector(currentUser);
    const axoisPrivate = useAxiosPrivate();
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    const timeAgo = (timestamp) => {
        const currentDate = new Date();
        const previousDate = new Date(timestamp);
        const timeDifference = currentDate - previousDate;

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return days === 1 ? '1 ngày trước' : `${days} ngày trước`;
        } else if (hours > 0) {
            return hours === 1 ? '1 giờ trước' : `${hours} giờ trước`;
        } else if (minutes > 0) {
            return minutes === 1 ? '1 phút trước' : `${minutes} phút trước`;
        } else {
            return seconds <= 10 ? 'bây giờ' : `${seconds} giây trước`;
        }
    };

    const handleEdit = async () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    };

    const handleSave = async () => {
        try {
            const res = await axoisPrivate.put(
                `/api/comment/edit/${comment._id}`,
                { content: editedContent },
                {
                    headers: { token: `bearer ${User.accessToken}` },
                },
            );

            toast.success(res.data.message);
            onEdit(comment, editedContent);
            setIsEditing(false);
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                console.log(err.message);
            }
        }
    };

    const handleDelete = async () => {
        try {
            const res = await axoisPrivate.delete(`/api/comment/${comment._id}`);
            toast.success(res.data.message);
            onDelete();
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                console.log(err.message);
            }
        }
    };

    return (
        <div className="flex p-4 border-b dark:border-gray-700">
            <div className="flex-shrink-0 mr-3">
                <img
                    className="w-10 h-10 rounded-full bg-gray-200"
                    src={comment.userId.profilePicture}
                    alt={comment.userId.username}
                />
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-1">
                    <span className="font-bold mr-1 text-sm truncate">
                        {comment.userId ? `@${comment.userId.username}` : `Ẩn danh`}
                    </span>
                    <span className="text-gray-500 text-xs">{timeAgo(comment.createdAt)}</span>
                </div>
                {isEditing ? (
                    <>
                        <Textarea
                            className="mb-2"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className="flex justify-end gap-2 text-xs">
                            <Button btn="primary" onClick={handleSave}>
                                Lưu
                            </Button>
                            <Button btn="outline" onClick={() => setIsEditing(false)}>
                                Hũy
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-gray-500 pb-2">{comment.content}</p>
                        <div className="flex items-center pt-2 text-sm border-t dark:border-gray-700 max-w-fit gap-2">
                            <button
                                type="button"
                                onClick={() => onLike(comment._id)}
                                className={`text-gray-400 hover:text-blue-500 ${
                                    User && comment.likes.includes(User?._id) && `!text-blue-500`
                                }`}
                            >
                                <FaThumbsUp className="text-sm" />
                            </button>
                            <p className="text-gray-400">
                                {comment.numberOfLikes > 0 &&
                                    comment.numberOfLikes + ' ' + (comment.numberOfLikes === 1 ? 'like' : 'likes')}
                            </p>
                            {User?._id === comment.userId._id && (
                                <>
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-blue-500"
                                        onClick={handleEdit}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-red-500"
                                        onClick={handleDelete}
                                    >
                                        Xóa
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Comment;
