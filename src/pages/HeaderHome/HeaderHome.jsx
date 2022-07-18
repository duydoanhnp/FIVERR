import React, { Fragment, memo } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Dropdown, Menu, Space } from "antd";
import { TOKEN, USER_LOGIN } from "../../util/setting";
import { DownOutlined } from "@ant-design/icons";

function HeaderHome(props) {
  const { userLogin } = useSelector((rootReducer) => rootReducer.auth);
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <NavLink
              style={{
                display: "block",
                padding: "10px 0",
                color: "#62646a",
                fontSize: "18px",
                fontWeight: "700",
              }}
              to={`/personal/${userLogin._id}`}
            >
              Personal Page
            </NavLink>
          ),
        },
        {
          key: "2",
          label: (
            <NavLink
              style={{
                display: "block",
                padding: "10px 0",
                color: "#62646a",
                fontSize: "18px",
                fontWeight: "700",
              }}
              to={`/admin/user`}
            >
              Admin Page
            </NavLink>
          ),
        },
        {
          key: "3",
          label: (
            <NavLink
              style={{
                display: "block",
                padding: "10px 0",
                color: "#62646a",
                fontSize: "18px",
                fontWeight: "700",
              }}
              to={`/admin/user/infouser/${userLogin._id}`}
            >
              Personal Detail
            </NavLink>
          ),
        },
      ]}
    />
  );
  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <div className="d-flex justify-content-end">
            <NavLink
              to="/login"
              className="btn__login btn btn-success"
              type="primary"
            >
              Login
            </NavLink>
            <NavLink
              className="btn__register ml-2 btn btn-primary"
              to="/register"
              type="primary"
            >
              Register
            </NavLink>
          </div>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <div className="d-flex justify-content-end">
          <Dropdown overlay={menu} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space className="btn__login btn">
                <i className="fa-solid fa-user-ninja"></i> hi {userLogin.email}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>

          <NavLink
            to="/"
            className="ml-2 btn__logout btn btn-danger"
            onClick={() => {
              if (window.confirm("Bạn có muốn đăng xuất không?")) {
                // xóa mọi dữ liệu trong localstorage
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
              }
              props.history.push("/home");
              window.location.reload();
              //chuyen hướng về home và reload lại trang
            }}
            type="primary"
          >
            Log Out
          </NavLink>
        </div>
      </Fragment>
    );
  };

  return <div>{renderLogin()}</div>;
}

export default memo(HeaderHome);
