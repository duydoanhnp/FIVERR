import { useDispatch } from "react-redux";
import React, { memo, useRef } from "react";
import { USER_LOGIN } from "../../util/setting";
import { NavLink, Redirect } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { userLoginAPI } from "../../redux/reducers/userReducer";
import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";

function Login() {
  const [form] = Form.useForm();
  console.log(form);

  const userLoginRef = useRef({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    const action = userLoginAPI(userLoginRef.current);
    dispatch(action);
  };
  const handleChange = (event) => {
    let { id, value } = event.target;
    userLoginRef.current[id] = value;
  };
  if (localStorage.getItem(USER_LOGIN)) {
    alert("Bạn đã đăng nhập rồi! ");
    return <Redirect to="/home" />;
  }
  return (
    <section
      className="login"
      style={{ padding: "50px 0", backgroundColor: "#f7f7f7" }}
    >
      <Row justify="center">
        <Col xs={24} sm={12} lg={7} md={12}>
          <div className="content">
            <div className="site-card-border-less-wrapper">
              <Card
                bordered={true}
                style={{ margin: "0 auto", boxShadow: "0 0 8px #95979d" }}
              >
                <h1 className="login__header mb-2">Sign In to Fiverr</h1>
                {/* <div className="login__apps">
                  <a
                    href="https://www.facebook.com/"
                    className="btn-facebook btn btn-primary"
                  >
                    <i className="fab fa-facebook"></i>
                    Continue with Facebook
                  </a>
                  <br />
                  <a
                    href="https://www.gmail.com/"
                    className="btn-google btn btn-primary"
                  >
                    <i className="fa-brands fa-google"></i>
                    Continue with Google
                  </a>
                  <br />
                  <a
                    href="https://www.gmail.com/"
                    className="btn-google btn btn-primary"
                  >
                    <i className="fa-brands fa-apple"></i>
                    Continue with Apple
                  </a>
                  <div className="login__separator">
                    <span>OR</span>
                  </div>
                </div> */}
                <Form
                  preserve={false}
                  name="normal_login"
                  form={form}
                  className="login-form"
                  onFinish={handleSubmit}
                  initialValues={{
                    remember: true,
                  }}
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                    ]}
                  >
                    <Input
                      id="email"
                      onChange={handleChange}
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input
                      id="password"
                      onChange={handleChange}
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                      Forgot password?
                    </a>
                  </Form.Item>

                  <Form.Item>
                    <Button htmlType="submit" className="login-form-button">
                      Continue
                    </Button>
                    <div className="login__separator"></div>
                    <div className="text-center">
                      <span className="login__text">Not a member yet?</span>
                      <NavLink className="login__register" to="/register">
                        Register now!
                      </NavLink>
                    </div>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
}
export default memo(Login);
