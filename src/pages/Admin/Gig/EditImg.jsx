import React, { memo, useEffect, useState } from "react";
import { Form } from "antd";
import "moment/locale/zh-cn";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editWorkImage,
  getWorkDetail,
} from "../../../redux/reducers/workReducer";

function EditImg(props) {
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
      _id: workDetail?._id,
      image: workDetail?.image,
    },
    onSubmit: (values) => {
      // let formData = new FormData()
      // for(let key in values){
      //     if(key !== "image"){
      //         formData.append(key,values[key])
      //     }else{
      //       if(values.image !== null){
      //         formData.append("File", values.image, values.image.name)
      //       }
      //     }
      // }
      const action = editWorkImage(formik.values._id, values.image);
      dispatch(action);
    },
  });
  const handleChangeFile = (e) => {
    // Lấy file từ e ra ([0] là chỉ lấy file đầu tiên)
    let file = e.target.files[0];
    // Set định dạng ảnh đầu vào
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      // Tạo đối tượng để đọc file
      // FileReader() cú pháp của JS
      let reader = new FileReader();
      // Đọc file
      reader.readAsDataURL(file);
      // Đọc file và trả ra kết quả ở dạng base64// e.target.result là kết quả trả về sau khi đọc file
      reader.onload = (e) => {
        // console.log("e.target.result", e.target.result);
        setImgSrc(e.target.result);
      };
      // Đem dữ liệu file vào formik
      formik.setFieldValue("image", file);

      // Set validation
      // formik.setErrors()
    }
  };
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  if (userLogin.role != "ADMIN") {
    alert("Bạn không có quyền truy cập vào trang!");
    return <Redirect to="/" />;
  }
  return (
    <section className="editimg">
      <h1
        className="text-center mb-5"
        style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
      >
        Edit Hình Ảnh
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
        <Form.Item label="Image">
          <input
            type="file"
            accept="image/png,image/jpg,image/jpeg,image/git"
            onChange={handleChangeFile}
          />
          <br />
          <img
            style={{ width: "150px", height: "150px" }}
            src={imgSrc === "" ? workDetail.image : imgSrc}
            alt=""
          />
        </Form.Item>
        <br />
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

export default memo(EditImg);
