import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { deleteCar, getAllCars } from '../redux/actions/carsActions'
import { Button, Row, Col, Divider, DatePicker, Checkbox, Edit } from 'antd'
import Spinner from "../components/Spinner"
import { Link } from 'react-router-dom'
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, message } from 'antd';

function AdminHome() {
    const { cars } = useSelector(state => state.carsReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const [totalCars, setTotalCars] = useState([])
    const dispatch = useDispatch()
    const { RangePicker } = DatePicker

    useEffect(() => {
        dispatch(getAllCars());
    }, [])

    useEffect(() => {
        setTotalCars(cars);
    }, [cars])


    return (
        <DefaultLayout>

            <Row justify='center' gutter={16} className='mt-2'>
                <Col lg={20} sm={24}>
                    <h3 className='text-right mt-2'>Admin Panel</h3>
                    <button className='btn1'> <a href="/addcar" style={{ color: 'whitesmoke' }}>ADD CAR</a></button>
                </Col>
            </Row>

            {loading === true && (<Spinner />)}

            <Row justify='center' gutter={16}>
                {totalCars.map(car => {
                    return <Col lg={5} sm={24} xs={24}>
                        <div className="car p-2 bs1 ">
                            <img src={car.image} className="carimg" />

                            <div className="car-content d-flex align-items-center justify-content-between">

                                <div className='tet-left pl-2'>
                                    <p>{car.name}</p>
                                    <p> Rent Per Hour - {car.rentPerHour}$</p>
                                </div>

                                <div className='mr-4'>
                                    <Link to={`/editcar/${car._id}`}><EditOutlined onClick={() => { }} className='mr-3' style={{ color: 'blue', cursor: 'pointer' }} /> </Link>

                                    <Popconfirm
                                        title="Are you sure you want to delete this car?"
                                        onConfirm={()=>{dispatch(deleteCar({carid: car._id}))}}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                       <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
                                    </Popconfirm>                                    
                                </div>
                            </div>
                        </div>
                    </Col>
                })}
            </Row>
        </DefaultLayout>
    )
}

export default AdminHome