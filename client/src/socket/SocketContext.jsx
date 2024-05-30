import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { currentUser } from '~/redux/selectors';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const User = useSelector(currentUser);

    useEffect(() => {
        if (User) {
            const socket = io(process.env.REACT_APP_BASE_URL, {
                query: {
                    userId: User._id,
                },
            });

            setSocket(socket);

            socket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users);
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [User]);
    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
