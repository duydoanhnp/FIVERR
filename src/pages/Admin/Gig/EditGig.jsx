import React, { memo, useEffect, useRef, useState } from "react";
import "moment/locale/zh-cn";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
import { Form, Input, InputNumber, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  editCongViec,
  getWorkDetail,
} from "../../../redux/reducers/workReducer";

function EditGig(props) {
  const [imgSrc, setImgSrc] = useState("");
  const [componentSize, setComponentSize] = useState("default");
  const { workDetail } = useSelector((rootReducer) => rootReducer.workReducer);
  const { userLogin } = useSelector((rootReducer) => rootReducer.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    let { id } = props.match.params;
    dispatch(getWorkDetail(id));
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: workDetail?.name,
      price: workDetail?.price,
      rating: workDetail?.rating,
      localSellers: workDetail?.localSellers,
      onlineSellers: workDetail?.onlineSellers,
      proServices: workDetail?.proServices,
      deliveryTime: workDetail?.deliveryTime,
      _id: workDetail?._id,
      image: workDetail?.image,
    },
    onSubmit: (values) => {
      console.log(values);
      const action = editCongViec(formik.values._id, values);
      dispatch(action);
    },
  });
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/git"
    ) {
      await formik.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };
  if (userLogin.role != "ADMIN") {
    alert("Bạn không có quyền truy cập vào trang!");
    return <Redirect to="/" />;
  }
  return (
    <section className="edituser">
      <h1
        className="text-center mb-5"
        style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
      >
        Edit Công Việc
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
        <Form.Item label="Job name">
          <Input
            onChange={formik.handleChange}
            name="name"
            value={formik.values.name}
            placeholder="Name"
          />
        </Form.Item>
        <Form.Item label="Price">
          <InputNumber
            value={formik.values.price}
            name="price"
            onChange={(value) => {
              formik.setFieldValue("price", value);
            }}
            min={0}
            max={100000}
          />{" "}
        </Form.Item>
        <Form.Item label="Rating">
          <InputNumber
            value={formik.values.rating}
            name="rating"
            onChange={(value) => {
              formik.setFieldValue("rating", value);
            }}
            min={1}
            max={10}
          />{" "}
        </Form.Item>

        <Form.Item label="ProServices" valuePropName="checked">
          <Switch
            checked={formik.values.proServices}
            name="proServices"
            onChange={handleChangeSwitch("proServices")}
          />
        </Form.Item>

        <Form.Item label="Local Sellers" valuePropName="checked">
          <Switch
            checked={formik.values.localSellers}
            name="localSellers"
            onChange={handleChangeSwitch("localSellers")}
          />
        </Form.Item>

        <Form.Item label="Online Sellers" valuePropName="checked">
          <Switch
            checked={formik.values.onlineSellers}
            name="onlineSellers"
            onChange={handleChangeSwitch("onlineSellers")}
          />
        </Form.Item>

        <Form.Item label="Delivery Time" valuePropName="checked">
          <Switch
            checked={formik.values.deliveryTime}
            name="deliveryTime"
            onChange={handleChangeSwitch("deliveryTime")}
          />
        </Form.Item>
        {/* <Form.Item label="Hình Ảnh">
                    <input  type="file" accept='image/png,image/jpg,image/jpeg,image/git' onChange={handleChangeFile}/>
                    <br/>
                    <img style={{width: '150px', height:"150px"}} src={imgSrc==="" ? workDetail.image : imgSrc} alt="" />
                </Form.Item> */}
        <Form.Item
          label="Job image"
          className="font-weight-bold position-relative"
        >
          {/* <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg, image/jpg"
          /> */}
          <Input
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
            placeholder="Enter link image"
          />{" "}
          <br />
          <div
            style={{
              width: "300px",
              height: "200px",
              backgroundImage: `url(${imgSrc ? imgSrc : formik.values.image}`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPositionX: "right",
              position: "absolute",
              right: "0",
              bottom: "50px",
            }}
          ></div>
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

export default memo(EditGig);
