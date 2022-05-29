import { message } from 'antd';
import axios from 'axios';

export const getAllCars = () => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get('/api/cars/getallcars')
        console.log(response.data);
        dispatch({ type: "GET_ALL_CARS", payload: response.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const addCar = (reqObj) => async dispatch => {

    try {
        const response = await axios.post('/api/cars/addcar', reqObj)
        message.success('New car added successfully!')
        dispatch({ type: 'LOADING', payload: false })
        setTimeout(() => {
            window.location.href = '/admin'
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const editCar = (reqObj) => async dispatch => {

    try {
        const response = await axios.post('/api/cars/editcar', reqObj)
        message.success('Car details updated successfully!')
        dispatch({ type: 'LOADING', payload: false })
        setTimeout(() => {
            window.location.href = '/admin'
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const deleteCar = (reqObj) => async dispatch => {

    try {
        const response = await axios.post('/api/cars/deletecar', reqObj)
        message.success('Car deleted successfully!')
        dispatch({ type: 'LOADING', payload: false })
        setTimeout(() => {
            window.location.reload()
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}