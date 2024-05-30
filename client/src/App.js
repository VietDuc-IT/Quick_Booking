import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DefaultLayout from './layout/default.layout';
import SystemLayout from './layout/system.layout';
import PrivateRoute from './ultils/setRoute/PrivateRoute';
import SystemRoute from './ultils/setRoute/SystemRoute';
import AdminRoute from './ultils/setRoute/AdminRote';
import NotFound from './common/NotFound';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import ForgotPass from './pages/authentication/ForgotPass';
import RefreshPass from './pages/authentication/RefreshPass';

// ============ Public =============
import Home from './pages/public/Home';
import Rent from './pages/public/Rent';
import About from './pages/public/About';
import Infor from './pages/public/Infor';
import Detail from './pages/public/Details';
import History from './pages/public/History';
import RenterLogin from './pages/public/RenterLogin';

// ============ Private =============
import Dashboard from './pages/system/Dashboard';
import User from './pages/system/User/User';
import CreatePost from './pages/system/Post/CreatePost';
import Posts from './pages/system/Post/Posts';
import EditPost from './pages/system/Post/EditPost';
import Profile from './pages/system/User/Profile';
import Category from './pages/system/Category/ListCategory';
import Comment from './pages/system/Message/Message';
import Host from './pages/system/User/Host';
import Bill from './pages/system/Bill';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPass />} />
                <Route path="/refresh-password/:id" element={<RefreshPass />} />
                <Route path="*" element={<NotFound />} />

                {/* DefaultLayout */}
                <Route element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/rent" element={<Rent />} />
                    <Route path="/post/:id" element={<Detail />} />
                    <Route path="/about" element={<About />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/information" element={<Infor />} />
                        <Route path="/history/:id" element={<History />} />
                        <Route path="/newpost" element={<RenterLogin />} />
                    </Route>
                </Route>

                {/* SystemLayout */}
                <Route element={<SystemRoute />}>
                    <Route element={<SystemLayout />}>
                        <Route element={<AdminRoute />}>
                            <Route path="/user" element={<User />} />
                            <Route path="/category" element={<Category />} />
                            <Route path="/host" element={<Host />} />
                            <Route path="/bill" element={<Bill />} />
                        </Route>

                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/create-post" element={<CreatePost />} />
                        <Route path="/posts" element={<Posts />} />
                        <Route path="/update-post/:postId" element={<EditPost />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/comment" element={<Comment />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
