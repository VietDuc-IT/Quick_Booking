import { Textarea } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { currentUser } from '~/redux/selectors';
import Button from '../Button';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import axios from '~/ultils/axios';
import Comment from './Comment';

function CommentSection() {
    const User = useSelector(currentUser);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { id } = useParams();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/comment/${id}`);
            setComments(res.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (comment.length > 200) {
            return;
        }

        try {
            const res = await axiosPrivate.post(
                '/api/comment',
                { content: comment, postId: id, userId: User._id },
                {
                    headers: { token: `bearer ${User.accessToken}` },
                },
            );
            toast.success(res.data.message);
            setComments([res.data.comment, ...comments]);
            fetchData();
            setComment('');
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                console.log(err.message);
            }
        }
    };

    const handleLike = async (commentId) => {
        try {
            if (!User) {
                navigate('/sign-in');
                return;
            }
            const res = await axiosPrivate.put(`/api/comment/like/${commentId}`, '', {
                headers: { token: `bearer ${User.accessToken}` },
            });

            const data = res.data;
            setComments(
                comments.map((comment) =>
                    comment._id === commentId
                        ? { ...comment, likes: data.likes, numberOfLikes: data.likes.length }
                        : comment,
                ),
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = async (comment, editedContext) => {
        setComments(comments.map((c) => (c._id === comment._id ? { ...c, content: editedContext } : c)));
    };

    const handleDelete = () => {
        fetchData();
    };

    return (
        <div className="mt-10">
            {User ? (
                <div className="flex items-center gap-1 text-sm">
                    <p>Tài khoản: </p>
                    <img className="h-5 w-5 object-cover rounded-full" src={User.profilePicture} alt="" />
                    <Link to="" className="hover:text-primary-default">
                        @{User.username}
                    </Link>
                </div>
            ) : (
                <div>Bạn phải đăng nhập để bình luận.</div>
            )}
            <form className="border border-green-500 rounded-md p-3 mt-5" onSubmit={handleSubmit}>
                <Textarea
                    placeholder="Viết bình luận ..."
                    rows="3"
                    maxLength="200"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                />
                <div className="flex justify-between items-center pt-3">
                    <p className="text-sm">Còn lại {200 - comment.length} kí tự</p>
                    {User ? (
                        <Button btn="outline" type="submit">
                            Bình luận
                        </Button>
                    ) : (
                        <Button btn="outline" to="/sign-in">
                            Bình luận
                        </Button>
                    )}
                </div>
            </form>

            {comments?.length === 0 ? (
                <p className="mt-5">Không có bình luận nào!</p>
            ) : (
                <>
                    <div className="text-sm my-5 flex items-center gap-1">
                        <p>Bình luận</p>
                        <div className="border border-gray-400 py-1 px-2 rounded-sm">
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    {comments?.map((comment) => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            onLike={handleLike}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </>
            )}
        </div>
    );
}

export default CommentSection;
