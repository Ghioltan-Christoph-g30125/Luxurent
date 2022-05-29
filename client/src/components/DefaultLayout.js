import { Menu, Dropdown, Button, Space, Row, Col } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom'
import { InstagramOutlined, FacebookOutlined } from '@ant-design/icons';

function DefaultLayout(props) {
    const user = JSON.parse(localStorage.getItem('user'))
    var access;
    if(user.username=="chris" && user.password=="1111")
      access=false;
    else
      access=true;
    console.log(access);
    const menu = (
        <Menu>
            <Menu.Item>
                <a style={{ color: 'navy' }} href="/home">Home</a>
            </Menu.Item>

            <Menu.Item>
                <a style={{ color: 'navy' }} href="/userbookings">Bookings</a>
            </Menu.Item>
            <Menu.Item>
                <a hidden={access} style={{ color: 'navy' }} className='co' href="/admin">Admin</a>
            </Menu.Item>
            <Menu.Item onClick={() => {
                localStorage.removeItem('user');
                window.location.href = '/login';
            }}>
                <li>Logout</li>
            </Menu.Item>
        </Menu>
    );
    return (
        <div>
            <div className="header bs1">
                <Row gutter={16} justify='center'>
                    <Col lg={20} sm={24} xs={24}>
                        <div className="d-flex justify-content-between">

                            <a style={{ color: 'navy', fontSize: '45px', fontWeight: 'bold'}}  href="/home">Luxurent</a>
                          

                            <Dropdown overlay={menu} placement="bottomCenter">
                                <Button>{user.username}</Button>
                            </Dropdown>

                        </div >
                    </Col>
                </Row>


            </div>
            <div className="content"> {props.children}</div>

            <div className='footer text=center'>
                <hr />
                <p style={{ color: 'black', cursor: 'pointer' }}>Designed and Developed by</p>

                <FacebookOutlined style={{ color: 'blue' }} />
                <a style={{ color: 'blue', cursor: 'pointer' }} href="https://www.facebook.com/AutoChris-Huse-Volan-101273788024892"> AutoChris - Huse Volan</a>
                <p/>
                <InstagramOutlined style={{ color: 'orangered' }} />
                <a style={{ color: 'blue', cursor: 'pointer' }} href="https://www.instagram.com/autochris19/"> autochris19</a>
                <p style={{ color: 'gray' }}>make sure you follow us</p>
            </div>
        </div>
    )
}

export default DefaultLayout
