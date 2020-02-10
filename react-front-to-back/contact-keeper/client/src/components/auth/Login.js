import React, { useState, useContext } from 'react'
import AlertContext from '../../context/alert/alertContext';

const Login = () => {
    const alertContext = useContext(AlertContext);

    const [login, setLogin] = useState({
        email: '',
        password: '',
    });
    const { email, password } = login;

    const onChange = e => setLogin({ ...login, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        console.log('Login Subimt');
    }
    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Log In</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="formGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange}/>
                </div>
                <div className="formGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange}/>
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Login;