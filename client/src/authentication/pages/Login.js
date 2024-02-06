import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthData } from '../index';

export const Login = () => {
    const navigate = useNavigate();
    const { login } = AuthData();
    const [formData, setFormData] = useReducer(
        (formData, newItem) => {
            return { ...formData, ...newItem };
        },
        { userName: null, password: null, role: null },
    );
    const [errorMessage, setErrorMessage] = useState(null);

    const doLogin = async () => {
        try {
            await login(formData.userName, formData.password, formData.role);
            navigate('/account');
        } catch (error) {
            setErrorMessage(error);
            console.log(errorMessage);
        }
    };

    return (
        <div className="page">
            <h2>Login page</h2>
            <div className="inputs">
                <div className="input">
                    <p>UserName</p>
                    <input
                        value={formData.userName}
                        onChange={(e) => setFormData({ userName: e.target.value })}
                        type="text"
                    />
                </div>
                <div className="input">
                    <p>Password</p>
                    <input
                        value={formData.password}
                        onChange={(e) => setFormData({ password: e.target.value })}
                        type="password"
                    />
                </div>
                <div className="input">
                    <p>Role [admin,manager,user]</p>
                    <input value={formData.role} onChange={(e) => setFormData({ role: e.target.value })} type="text" />
                </div>
                <div className="button">
                    <button onClick={doLogin}>Log in</button>
                </div>
                {errorMessage ? <div className="error">{errorMessage}</div> : null}
            </div>
        </div>
    );
};
