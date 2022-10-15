import {
    PhoneOutlined, LockOutlined
} from '@ant-design/icons'
import { Button, Col, Row, Checkbox, Form, Input, message } from 'antd'
import { Typography } from 'antd'
import React, { useState, useRef } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AccountApi } from "../../utils/apis"
// import { setToken } from '../../store/store'
import { validPhone, validPassword } from '../../utils/regexp'

const { Title } = Typography;


const Register = () => {
    // const dispatch = useDispatch();
    // let history = useHistory();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [loadings, setLoadings] = useState([]);

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
    };

    const stopLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = false;
            return newLoadings;
        });
    }

    const onFinish = async (values) => {

        if (!validPhone.test(values.phoneNumber)) {
            message.error('Số điện thoại không hợp lệ');
            stopLoading(0);
            phoneRef.current.focus();
            return;
        }
        if (!validPassword.test(values.password)) {
            message.error('Mật khẩu ít nhất 6 ký tự');
            stopLoading(0);
            passwordRef.current.focus();
            return;
        }
        if(values.password != values.repeat_password){
            message.error('Mật khẩu không giống nhau');
            stopLoading(0);
            passwordRef.current.focus();
            return;
        }

        const accountApi = new AccountApi()
        try {
            const response = await accountApi.register(values);
            console.log(response)
            if (response.status == 200) {
                message.success("Đăng ký thành công!")
                navigate('/dang-nhap')
            } else {
                message.error('Có lỗi xảy ra')
            }
        } catch (error) {
            console.log('Failed:', error)
            message.error('Có lỗi xảy ra')
        } finally {
            stopLoading(0)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
        message.error('Có lỗi xảy ra')
    };

    return (
        <Row justify="space-around" align="middle" style={{
            height: '100vh',
            textAlign: 'center'
        }}>
            <Col span={8} xs={18} sm={14} md={10} lg={8} style={{ backgroundColor: "white", padding: "50px", borderRadius: "10px" }}>
                <Title level={2} style={{ marginBottom: '20px'}}>
                    Đăng ký
                </Title>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại!',
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            ref={phoneRef}
                            prefix={<PhoneOutlined className="site-form-item-icon" />}
                            placeholder="Số điện thoại"
                            autoFocus />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                        ]}
                    >
                        <Input.Password
                            size="large"
                            ref={passwordRef}
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>
                    <Form.Item
                        name="repeat_password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập lại mật khẩu!',
                            },
                        ]}
                    >
                        <Input.Password
                            size="large"
                            ref={passwordRef}
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" size="large"
                            loading={loadings[0]}>
                            Đăng ký
                        </Button>
                    </Form.Item>
                    <p>Quên mật khẩu ? <Link to="/quen-mat-khau">Lấy lại mật khẩu</Link> </p>
                </Form>
            </Col>
        </Row >
    )
}

export default Register;