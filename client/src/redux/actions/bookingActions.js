import axios from 'axios';
import { message } from 'antd'

export const bookCar = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.post('/api/bookings/bookcar', reqObj)
        message.success('Your car booking was successfully created.')
        setTimeout(() => {
            window.location.href = '/userbookings';
        }, 500);
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
        message.error('Something went wrong, please try again')
    }
};

export const getAllBookings = () => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get('/api/bookings/getallbookings')
        dispatch({ type: "GET_ALL_BOOKINGS", payload: response.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}