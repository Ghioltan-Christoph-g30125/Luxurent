import React, { useEffect } from 'react'
import { Row, Col, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../redux/actions/userActions';
import AOS from 'aos';
import Spinner from '../components/Spinner';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

function Login() {


    const dispatch = useDispatch();
    const {loading} = useSelector(state=>state.alertsReducer);

    function onFinish(values) {
        dispatch(userLogin(values));  
    }

    return (
        <div className='login'>

            {loading && <Spinner/>} 

            <Row gutter={16} className='d-flex align-items-center'>

                <Col lg={16} style={{ position: 'relative' }}>
                    <img 
                    data-aos='slide-right' data-aos-duration='1500'
                    src="./images/login-car.jpg" alt="" className='img-wallpaper' />
                    <h1 className='login-logo'>LUXURENT</h1>
                </Col>
                <Col lg={8} className='p-5' >
                    <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
                        <h1>Login</h1>
                        <hr color='#555353' />
                        <Form.Item name='username' label='Username' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='password' label='Password' rules={[{ required: true }]}>
                            <Input type="password"/>
                        </Form.Item>

                        <div className='text-left'>
                            <button className='btn1 mt-2 mb-3'>LOGIN</button>
                            <br />
                            <Link to='/register'>Don't have an account? Click Here to Register</Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Login
