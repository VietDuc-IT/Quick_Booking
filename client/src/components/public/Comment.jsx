function Comment({ comment }) {
    console.log(comment);

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

    return (
        <div className="flex p-4 border-b">
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
                <p>{comment.content}</p>
            </div>
        </div>
    );
}

export default Comment;
