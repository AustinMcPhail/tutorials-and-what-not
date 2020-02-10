import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from '../types';

const AuthState = props => {
    const initialState = {
        user: null,
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User ------
    const loadUser = () => {

    }
    // ----------------

    // Register User ------
    const registerUser = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }
    }
    // --------------------

    // Login User ------
    const loginUser = () => {
        
    }
    // -----------------

    // Logout User ------
    const logoutUser = () => {
        
    }
    // ------------------

    // Clear Errors ------
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS })
    // -------------------

    return (
        <AuthContext.Provider
        value={{
            user: state.user,
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error,
            registerUser,
            loadUser,
            loginUser,
            logoutUser,
            clearErrors
        }}>
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthState;