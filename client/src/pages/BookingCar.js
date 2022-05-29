import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions'
import Spinner from '../components/Spinner'
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from 'antd';
import moment from 'moment'
import { bookCar } from '../redux/actions/bookingActions';
import StripeCheckout from 'react-stripe-checkout';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

const { RangePicker } = DatePicker;
function BookingCar({match}) {
    const { carid } = useParams();
    const { cars } = useSelector(state => state.carsReducer);
    const { loading } = useSelector(state => state.alertsReducer);
    const [car, setcar] = useState({});
    const dispatch = useDispatch();
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [totalHours, setTotalHours] = useState(0);
    const [driver, setDriver] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        if (cars.length == 0) {
            dispatch(getAllCars());
        } else {
            setcar(cars.find((o) => o._id == carid));
        }
    }, [cars]);

    useEffect(() => {
        setTotalAmount((totalHours * car.rentPerHour))
        if (driver) {
            setTotalAmount(totalAmount + (30 * totalHours));
        }
    }, [driver, totalHours]);


    function selectTimeSlots(values) {
        setFrom(moment(values[0]).format('MMM DD yyyy HH:mm'));
        setTo(moment(values[1]).format('MMM DD yyyy HH:mm'));

        setTotalHours(values[1].diff(values[0], 'hours'))
    }

    function onToken(token) {
        const reqObj = {
            token,
            user: JSON.parse(localStorage.getItem('user'))._id,
            car: car._id,
            totalHours,
            totalAmount,
            driverRequired: driver,
            bookedTimeSlots: {
                from,
                to
            }
        }
        dispatch(bookCar(reqObj));
    }

    return (
        <DefaultLayout>
            {loading && (<Spinner />)}

            <Row justify='center' className='d-flex align-items-center' style={{ minHeight: '90vh' }}>
                <Col lg={10} sm={24} xs={24} className='p-2'>
                    <img src={car.image} className="carimg2 bs1" data-aos='slide-right' data-aos-duration='1000' />
                </Col>

                <Col lg={10} sm={24} xs={24}>
                    <Divider type='horizontal' dashed >Car Info</Divider>
                    <div style={{ textAlign: 'right' }}>
                        <p>{car.name}</p>
                        <p>{car.rentPerHour}$ - Rent per Hour</p>
                        <p>Fuel Type: {car.fuelType}</p>
                        <p>Maximum persons: {car.capacity}</p>
                    </div>

                    <Divider type='horizontal' dashed>Select Time Slots</Divider>
                    <div style={{ textAlign: 'right' }}>
                        <RangePicker showTime format='MMM DD yyyy HH:mm' onChange={selectTimeSlots} />
                    </div>

                    <br />
                    <div style={{ textAlign: 'right' }}>
                        <button className='btn1 mt-2' onClick={() => { setShowModal(true) }}>See Booked Slots</button>
                    </div>


                    {from && to && (<div style={{ textAlign: 'right' }}>

                        <p>Total Hours : <b>{totalHours}</b></p>
                        <p> Rent Per Hour :  <b>{car.rentPerHour} $</b></p>
                        <Checkbox onChange={(e) => {
                            if (e.target.checked) {
                                setDriver(true);
                            } else {
                                setDriver(false);
                            }
                        }}   >Driver Required</Checkbox>
                        <h3>Total Amount : {totalAmount} $</h3>

                        <StripeCheckout
                            shippingAddress
                            token={onToken}
                            currency='USD'
                            amount={totalAmount * 100}
                            stripeKey="pk_test_51L1wJJCsfVTUgcc2ETE8XJSBzMyVnjTPOzrlSkEtjoL5yObRaQEnwvg4mZeX4tLDE0klvUIQVSdt7B4pB4viG9kL00lwAdrcHL">
                            <button className='btn1'>Book Now</button>
                        </StripeCheckout>

                    </div>
                    )}

                </Col>
            </Row>

            <Modal visible={showModal} closable={false} footer={false} title='Booked time slots'>

                {car.name && (<div className='p-2'>

                    {car.bookedTimeSlots.map(slot => {
                        return <button className='btn1 mt-2'>{slot.from} - {slot.to}</button>
                    })}

                    <div className='text-right'>

                        <button className='btn1' onClick={() => { setShowModal(false) }}>CLOSE</button>
                    </div>
                </div>)}
            </Modal>
        </DefaultLayout>
    )
}

export default BookingCar
