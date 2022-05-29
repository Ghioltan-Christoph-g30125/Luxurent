import axios from "axios";
import { message } from 'antd';

export const userLogin = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.post('/api/users/login', reqObj)
        localStorage.setItem('user', JSON.stringify(response.data))
        message.success('Login successfully')
        setTimeout(() => {
            window.location.href = '/home';
        }, 500);
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        message.error('Something went wrong')
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const userRegister = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    const { username, password, cpassword } = reqObj
    if (password == cpassword) {
        try {
            const response = await axios.post('/api/users/register', reqObj)
            message.success('Registration successful')
            setTimeout(() => {
                window.location.href = '/login';
            }, 500);
            dispatch({ type: 'LOADING', payload: false })
        } catch (error) {
            console.log(error)
            message.error('Something went wrong')
            dispatch({ type: 'LOADING', payload: false })
        }
    } else {
        message.error('Password does not  match');
        dispatch({ type: 'LOADING', payload: false })
    }

}