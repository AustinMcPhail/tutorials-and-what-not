import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { registerUser, clearErrors, error, isAuthenticated } = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'Email address already in use') {
            setAlert(error, 'danger')
            clearErrors()
        }
    }, [error, isAuthenticated, props.history]);
    
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });
    const { name, email, password, passwordConfirm } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || email === '' || password === '' || passwordConfirm === '') {
            setAlert('Please fill out all fields', 'danger');
        } else if (password !== passwordConfirm) {
            setAlert('Passwords do not match', 'danger')
        } else {
            registerUser({ name, email, password });
        }
    }
    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="formGroup">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required/>
                </div>
                <div className="formGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="formGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required minLength="6"/>
                </div>
                <div className="formGroup">
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input type="password" name="passwordConfirm" value={passwordConfirm} onChange={onChange} required minLength="6"/>
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Register;