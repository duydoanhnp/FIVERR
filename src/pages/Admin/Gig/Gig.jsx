import React, { Fragment, memo, useEffect } from "react";
import { Table, Input } from "antd";
import { history } from "../../../App";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getArrWork, xoaCongViec } from "../../../redux/reducers/workReducer";

const { Search } = Input;

function Gig(props) {
  const { arrWork } = useSelector((rootReducer) => rootReducer.workReducer);
  const { userLogin } = useSelector((rootReducer) => rootReducer.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    const action = getArrWork();
    dispatch(action);
  }, []);
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (text, work, index) => {
        return (
          <Fragment key={text}>
            <img
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/${index + 1}/50`;
              }}
              style={{ width: "100px", height: "100px" }}
              src={work.image}
              alt="..."
            />
          </Fragment>
        );
      },
      width: "10%",
    },
    {
      title: "",
      dataIndex: "_id",
      render: (text, object) => {
        return (
          <Fragment>
            <NavLink
              to={`/admin/gig/editimg/${text}`}
              className="ml-3 text-primary"
              title="Update image"
            >
              <i className="text-primary fa fa-edit"></i>
            </NavLink>
          </Fragment>
        );
      },

      width: "2.5%",
    },
    {
      title: "Name",
      dataIndex: "name",

      width: "calc(100% / 5)",
    },

    {
      title: "Sub Type",
      dataIndex: "subType",
      render: (text, object) => {
        return <span>{object.subType?.name}</span>;
      },
      width: "calc(100% / 7)",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      width: "calc(100% / 7)",
    },
    {
      title: "Price",
      dataIndex: "price",

      width: "calc(100% / 7)",
    },
    {
      title: "Pro Services",
      dataIndex: "proServices",
      render: (text, object) => {
        return (
          <span>
            {object.proServices === true ? (
              <i className="text-success fa fa-check"></i>
            ) : (
              ""
            )}
          </span>
        );
      },
      width: "calc(100% / 7)",
    },
    {
      dataIndex: "email",
      render: (text, work) => {
        return (
          <Fragment>
            <NavLink
              style={{ fontSize: "20px", fontWeight: "bold" }}
              to={`/admin/gig/editgig/${work._id}`}
            >
              <i className="fa-solid fa-marker"></i>
            </NavLink>
            <a
              onClick={() => {
                dispatch(xoaCongViec(work._id));
              }}
              className="ml-4 mr-4"
              style={{ fontSize: "20px", fontWeight: "bold", color: "red" }}
            >
              <i className="fa-solid fa-trash"></i>
            </a>
          </Fragment>
        );
      },
      width: "calc(100% / 7)",
    },
  ];
  const arrWorkFilter = arrWork.filter(
    (job) =>
      job.subType !== null && job.image && job.rating && job.price && job.name
  );

  const data = arrWorkFilter;
  const onSearch = (value) => {
    dispatch(getArrWork(value));
  };
  const onChange = (pagination, filters, sorter, extra) => {};
  if (userLogin.role != "ADMIN") {
    alert("Bạn không có quyền truy cập vào trang!");
    return <Redirect to="/" />;
  }
  return (
    <section className="users">
      <h1
        className="text-center mb-5"
        style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
      >
        Quản Lý Công Việc
      </h1>
      <button
        onClick={() => {
          history.push("/admin/gig/addgig");
        }}
        className="btn__login btn btn-success"
      >
        Thêm Công Việc
      </button>
      <Search
        className="my-3"
        placeholder="Tìm kiếm công việc"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"_id"}
      />
    </section>
  );
}

export default memo(Gig);
