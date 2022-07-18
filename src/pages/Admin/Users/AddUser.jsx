import React, { memo, useRef, useState } from "react";
import moment from "moment";
import "moment/locale/zh-cn";
import { Redirect } from "react-router-dom";
import { DatePicker, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { themNguoiDung } from "../../../redux/reducers/userReducer";

function AddUser(props) {
  const { userLogin } = useSelector((rootReducer) => rootReducer.auth);

  const dispatch = useDispatch();
  const addNewUserRef = useRef({
    email: "",
    password: "",
    name: "",
    phone: "",
    role: "",
    gender: true,
    birthday: "",
  });
  const handleChange = (e) => {
    let { name, value } = e.target;
    addNewUserRef.current[name] = value;
  };
  const handleChangeLoaiNguoiDung = (e) => {
    addNewUserRef.current.role = e;
  };
  const handleChangeGioiTinh = (e) => {
    addNewUserRef.current.gender = e;
  };

  const handleSubmit = (e) => {
    const action = themNguoiDung(addNewUserRef.current);
    dispatch(action);
  };

  const onChangeDate = (e) => {
    let ngaySinh = moment(e).format("YYYY-MM-DD");
    addNewUserRef.current.birthday = ngaySinh;
  };

  const onOk = (e) => {
    let ngaySinh = moment(e).format("YYYY-MM-DD");
    addNewUserRef.current.birthday = ngaySinh;
  };
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  if (userLogin.role != "ADMIN") {
    alert("Bạn không có quyền truy cập vào trang!");
    return <Redirect to="/" />;
  }
  return (
    <section className="adduser">
      <h1
        className="text-center mb-5"
        style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
      >
        Thêm Người Dùng
      </h1>
      <Form
        onFinish={handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Loại Người Dùng">
          <Select
            placeholder="Chọn loại người dùng"
            onChange={handleChangeLoaiNguoiDung}
          >
            <Select.Option value="ADMIN">Admin</Select.Option>
            <Select.Option value="CLIENT">Client</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="email"
          label="Email "
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
          <Input onChange={handleChange} name="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Mật Khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            onChange={handleChange}
            name="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Nhập Lại Mật Khẩu"
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
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>
        <Form.Item label="Họ Tên">
          <Input onChange={handleChange} name="name" placeholder="Họ tên" />
        </Form.Item>

        <Form.Item label="Số Điện Thoại">
          <Input
            onChange={handleChange}
            name="phone"
            placeholder="Số điện thoại"
          />
        </Form.Item>
        <Form.Item label="Giới Tính">
          <Select placeholder="Chọn giới tính" onChange={handleChangeGioiTinh}>
            <Select.Option value={true}>Nam</Select.Option>
            <Select.Option value={false}>Nữ</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Ngày Sinh">
          <DatePicker
            onOk={onOk}
            onChange={onChangeDate}
            placeholder="Ngày sinh"
            format="YYYY-MM-DD"
            // showTime={{
            //   defaultValue: moment('00:00:00', 'HH:mm:ss'),
            // }}
          />
        </Form.Item>
        <Form.Item>
          <button
            style={{ marginLeft: "30%" }}
            className="btn-add btn btn-success"
            type="submit"
          >
            Xác Nhận
          </button>
        </Form.Item>
      </Form>
    </section>
  );
}

export default memo(AddUser);
