import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { loginUser, clearErrors, error, isAuthenticated } = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'Incorrect email or password') {
            setAlert(error, 'danger')
            clearErrors()
        }
    }, [error, isAuthenticated, props.history]);

    const [login, setLogin] = useState({
        email: '',
        password: '',
    });
    const { email, password } = login;

    const onChange = e => setLogin({ ...login, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please fill in all of the fields', 'danger')
        } else {
            loginUser({email, password});
        }
    }
    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Log In</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="formGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="formGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required/>
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Login;