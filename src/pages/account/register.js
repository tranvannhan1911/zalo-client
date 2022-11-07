import { PhoneOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Row, Checkbox, Form, Input, message } from "antd";
import { Typography } from "antd";
import React, { useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AccountApi } from "../../utils/apis";
import store, { setUser } from "../../store/store";
// import { setToken } from '../../store/store'
import { validPhone, validPassword } from "../../utils/regexp";

import { authentication } from "../../firebase/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const { Title } = Typography;

const Register = () => {
  // const dispatch = useDispatch();
  // let history = useHistory();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState([]);

  const countryCode = "+84";
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [OTP, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [expandForm, setExpandForm] = useState(true);
  const regex = /^0/i;

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
  };

  const onFinish = async (values) => {
    // if (!validPhone.test(values.phoneNumber)) {
    //     message.error('Số điện thoại không hợp lệ');
    //     stopLoading(0);
    //     phoneRef.current.focus();
    //     return;
    // }
    if (!validPassword.test(values.password)) {
      message.error("Mật khẩu ít nhất 6 ký tự");
      stopLoading(0);
      passwordRef.current.focus();
      return;
    }
    if (values.password != values.repeat_password) {
      message.error("Mật khẩu không giống nhau");
      stopLoading(0);
      passwordRef.current.focus();
      return;
    }

    // const accountApi = new AccountApi();
    // try {
    //   const response = await accountApi.register(values);
    //   console.log(response);
    //   if (response.status == 200) {
    //     message.success("Đăng ký thành công!");
    //     navigate("/dang-nhap");
    //   } else {
    //     message.error("Có lỗi xảy ra");
    //   }
    // } catch (error) {
    //   console.log("Failed:", error);
    //   message.error("Có lỗi xảy ra");
    // } finally {
    //   stopLoading(0);
    // }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Có lỗi xảy ra");
  };

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  const requestOTP = (e) => {
    e.preventDefault();
    generateRecaptcha();
    const newPhoneNumber = phoneNumber.replace(regex, countryCode);
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(authentication, newPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  };

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);
    if (otp.length === 6) {
      console.log(otp);
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then(async (result) => {
          // User signed in successfully.
          const user = result.user;
          const phoneNumber = user.phoneNumber.replace(/^[+]84/, "0").trim();
          const params = { phoneNumber, name, password };
          const accountApi = new AccountApi();
          try {
            const response = await accountApi.register(params);
            console.log(response);
            if (response.status == 200) {
              message.success("Đăng ký thành công!");
              const values = { phoneNumber, password };
              const response = await accountApi.login(values);
              console.log("login", response);
              accountApi.save_token(response);
              accountApi.save_info(response);

              const action = setUser(response.data);
              store.dispatch(action);
              // console.log("action", action)
              // store.subscribe(() => {
              //     console.log("store.subscribe", store.getState())
              // })

              navigate("/");
            } else {
              message.error("Có lỗi xảy ra");
            }
          } catch (error) {
            console.log("Failed:", error);
            message.error("Có lỗi xảy ra");
          } finally {
            stopLoading(0);
          }
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          console.log(error);
        });
    }
  };

  return (
    <Row
      justify="space-around"
      align="middle"
      style={{
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Col
        span={8}
        xs={18}
        sm={14}
        md={10}
        lg={8}
        style={{
          backgroundColor: "white",
          padding: "50px",
          borderRadius: "10px",
        }}
      >
        <Title level={2} style={{ marginBottom: "20px" }}>
          Đăng ký
        </Title>
        <form
          onSubmit={requestOTP}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên!",
              },
            ]}
          >
            <Input
              size="large"
              ref={nameRef}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Họ và tên"
              autoFocus
              id="nameInput"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại!",
              },
            ]}
          >
            <Input
              size="large"
              ref={phoneRef}
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Số điện thoại"
              autoFocus
              id="phoneNumberInput"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password
              size="large"
              ref={passwordRef}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item
            name="repeat_password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lại mật khẩu!",
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
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              loading={loadings[0]}
            >
              Đăng ký
            </Button>
          </Form.Item>
          {expandForm === true ? (
            <>
              <div>
                <label htmlFor="inputOTP" className="form-label">
                  Nhấn đăng ký, nhập OTP được gửi đến số điện thoại của bạn: {""}
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputOTP"
                  value={OTP}
                  onChange={verifyOTP}
                />
              </div>
            </>
          ) : null}
          <br></br>
          <p>
            Quên mật khẩu ? <Link to="/quen-mat-khau">Lấy lại mật khẩu</Link>{" "}
          </p>
          <p>
            Đã có tài khoản ? <Link to="/dang-nhap">Đăng nhập tại đây</Link>{" "}
          </p>
        </form>
        <div id="recaptcha-container"></div>
      </Col>
    </Row>
  );
};

export default Register;
