import React, { memo, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { USER_LOGIN } from "../../util/setting";
import { NavLink, Redirect } from "react-router-dom";
import { userRegisterAPI } from "../../redux/reducers/userReducer";
import { Button, Checkbox, Form, Input, Select, Card, Row, Col } from "antd";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Register() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );
  const userRegisterRef = useRef({
    email: "",
    password: "",
    phone: "",
    first_name: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    let { value, id } = e.target;
    userRegisterRef.current[id] = value;
  };
  const handleSubmit = (e) => {
    dispatch(userRegisterAPI(userRegisterRef.current));
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  if (localStorage.getItem(USER_LOGIN)) {
    alert("Bạn đã có tài khoản rồi! ");
    return <Redirect to="/home" />;
  }
  return (
    <section
      className="register"
      style={{ padding: "50px 0", backgroundColor: "#f7f7f7" }}
    >
      <Row justify="center">
        <Col xs={24} sm={12} lg={8} md={12}>
          <div className="content">
            <div className="site-card-border-less-wrapper">
              <Card
                bordered={true}
                style={{ margin: "0 auto", boxShadow: "0 0 8px #95979d" }}
              >
                <h1 className="register__header">Join Fiverr</h1>
                {/* <div className="register__apps">
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
                  <div className="register__separator">
                    <span>OR</span>
                  </div>
                </div> */}
                <div className="register__form">
                  <Form
                    preserve={false}
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={handleSubmit}
                    scrollToFirstError
                    initialValues={{
                      prefix: "84",
                    }}
                  >
                    <Form.Item
                      name="name"
                      label="Name"
                      tooltip="What do you want others to call you?"
                      rules={[
                        {
                          required: true,
                          message: "Please input your nickname!",
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input
                        id="name"
                        onChange={handleChange}
                        placeholder="Your Name"
                      />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="E-mail"
                      rules={[
                        {
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                        {
                          required: true,
                          message: "Please input your E-mail!",
                        },
                      ]}
                    >
                      <Input
                        id="email"
                        onChange={handleChange}
                        placeholder="Email"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      label="Password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || value.length >= 6) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Password is not enough strong!")
                            );
                          },
                        }),
                      ]}
                      hasFeedback
                    >
                      <Input.Password
                        id="password"
                        onChange={handleChange}
                        placeholder="Password"
                      />
                    </Form.Item>
                    <Form.Item
                      name="confirm"
                      label="Confirm Password"
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The two passwords that you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        id="password"
                        onChange={handleChange}
                        placeholder="Password"
                      />
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      label="Phone Number"
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone number!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            const regex = /^-?\d+$/;
                            if (!value || regex.test(value)) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("The input is not valid Phone Number!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input
                        onChange={handleChange}
                        id="phone"
                        placeholder="phone"
                        addonBefore={prefixSelector}
                        style={{
                          width: "100%",
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="agreement"
                      valuePropName="checked"
                      rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error("Should accept agreement")
                                ),
                        },
                      ]}
                      {...tailFormItemLayout}
                    >
                      <Checkbox>
                        I have read the{" "}
                        <a href="" className="register__agree">
                          agreement
                        </a>
                      </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                      <Button className="register__btn" htmlType="submit">
                        Register
                      </Button>
                      <div className="register__separator2"></div>
                      <div>
                        <span className="register__text">Already member?</span>
                        <NavLink className="register__register" to="/login">
                          Login now!
                        </NavLink>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
}
export default memo(Register);
