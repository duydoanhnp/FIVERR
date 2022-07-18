import React, { memo, useEffect, useRef, useState } from "react";
import moment from "moment";
import "moment/locale/zh-cn";
import { useFormik } from "formik";
import { DatePicker, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  editNguoiDung,
  userInfoAPI,
} from "../../../redux/reducers/userReducer";

function EditUser(props) {
  const { userInfo } = useSelector((rootReducer) => rootReducer.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    let { id } = props.match.params;
    dispatch(userInfoAPI(id));
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      role: userInfo?.role,
      email: userInfo?.email,
      password: userInfo?.password,
      name: userInfo?.name,
      phone: userInfo?.phone,
      gender: userInfo?.gender,
      birthday: userInfo?.birthday,
      _id: userInfo._id,
    },
    onSubmit: (values) => {
      const action = editNguoiDung(values._id, values);
      dispatch(action);
    },
  });
  const onChangeDate = (e) => {
    let birthday = moment(e);
    formik.setFieldValue("birthday", birthday);
  };
  const onChangeGender = (value) => {
    formik.setFieldValue("gender", value);
  };
  const onOk = (e) => {
    let birthday = moment(e);
    formik.setFieldValue("birthday", birthday);
  };
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <section className="edituser">
      <h1
        className="text-center mb-5"
        style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
      >
        Edit Người Dùng
      </h1>
      <Form
        onSubmitCapture={formik.handleSubmit}
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
            placeholder={userInfo?.role}
            style={{
              width: 120,
            }}
            disabled
          ></Select>
        </Form.Item>
        <Form.Item label="Email">
          <Input
            disabled
            onChange={formik.handleChange}
            name="email"
            value={formik.values.email}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item label="Mật Khẩu">
          <Input.Password
            onChange={formik.handleChange}
            name="password"
            value={formik.values.password}
            placeholder="Mật khẩu"
          />
        </Form.Item>

        <Form.Item label="Họ Tên">
          <Input
            onChange={formik.handleChange}
            name="name"
            value={formik.values.name}
            placeholder="Họ tên"
          />
        </Form.Item>

        <Form.Item label="Số Điện Thoại">
          <Input
            onChange={formik.handleChange}
            name="phone"
            value={formik.values.phone}
            placeholder="Số điện thoại"
          />
        </Form.Item>
        <Form.Item label="Giới tính">
          <Select
            value={formik.values.gender}
            // placeholder={formik.values.gender ? "Nam" : "Nữ"}
            allowClear
            onChange={onChangeGender}
            style={{
              width: 120,
            }}
          >
            <Select.Option value={true}>Nam</Select.Option>
            <Select.Option value={false}>Nữ</Select.Option>
          </Select>{" "}
        </Form.Item>
        <Form.Item label="Ngày Sinh">
          <DatePicker
            onChange={onChangeDate}
            onOk={onOk}
            placeholder="Ngày sinh"
            format={"YYYY-MM-DD"}
            value={moment(formik.values.birthday)}
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

export default memo(EditUser);
