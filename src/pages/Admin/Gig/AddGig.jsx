import React, { memo, useState } from "react";
import "moment/locale/zh-cn";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, InputNumber, Switch } from "antd";
import { addNewWork } from "../../../redux/reducers/workReducer";

function AddGig(props) {
  const [imgSrc, setImgSrc] = useState("");
  const [componentSize, setComponentSize] = useState("default");
  const { userLogin } = useSelector((rootReducer) => rootReducer.auth);

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      rating: 0,
      price: 0,
      proServices: false,
      localSellers: false,
      onlineSellers: false,
      deliveryTime: false,
      image: "",
    },
    onSubmit: (value) => {
      dispatch(addNewWork(value));
    },
  });

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/git"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
      formik.setFieldValue("image", file.name);
    }
  };
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  if (userLogin.role !== "ADMIN") {
    alert("Bạn không có quyền truy cập vào trang!");
    return <Redirect to="/" />;
  }
  return (
    <section className="adduser">
      <h1
        className="text-center mb-5"
        style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
      >
        Thêm Công Việc
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
        <Form.Item
          name="name"
          label="Job Name "
          rules={[
            {
              type: "name",
              message: "The input is not valid",
            },
            {
              required: true,
              message: "Please input job name",
            },
          ]}
        >
          <Input
            onChange={formik.handleChange}
            name="name"
            placeholder="Name"
          />
        </Form.Item>
        <Form.Item label="Rating">
          <InputNumber
            name="rating"
            onChange={(value) => {
              formik.setFieldValue("rating", value);
            }}
            min={1}
            max={10}
          />{" "}
        </Form.Item>

        <Form.Item label="Price">
          <InputNumber
            name="price"
            onChange={(value) => {
              formik.setFieldValue("price", value);
            }}
            min={0}
            max={100000}
          />{" "}
        </Form.Item>

        <Form.Item label="ProServices" valuePropName="checked">
          <Switch
            name="proServices"
            onChange={handleChangeSwitch("proServices")}
          />
        </Form.Item>

        <Form.Item label="Local Sellers" valuePropName="checked">
          <Switch
            name="localSellers"
            onChange={handleChangeSwitch("localSellers")}
          />
        </Form.Item>

        <Form.Item label="Online Sellers" valuePropName="checked">
          <Switch
            name="onlineSellers"
            onChange={handleChangeSwitch("onlineSellers")}
          />
        </Form.Item>

        <Form.Item label="Delivery Time" valuePropName="checked">
          <Switch
            name="deliveryTime"
            onChange={handleChangeSwitch("deliveryTime")}
          />
        </Form.Item>

        <Form.Item label="Image">
          <input
            name="image"
            type="file"
            accept="image/png,image/jpg,image/jpeg,image/git"
            onChange={handleChangeFile}
          />
          <br />
          <img
            style={{ width: "150px", height: "150px" }}
            src={imgSrc}
            alt=""
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

export default memo(AddGig);
