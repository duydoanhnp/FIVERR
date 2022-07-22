import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Redirect, Route } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Dropdown, Space } from "antd";
import {
  UserOutlined,
  GitlabOutlined,
  AuditOutlined,
  RobotOutlined,
  CarOutlined,
  SubnodeOutlined,
  RedditOutlined,
} from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { USER_LOGIN } from "../../util/setting";
const { Header, Content, Footer, Sider } = Layout;

export const AdminTemplate = (props) => {
  const { userLogin } = useSelector((rootReducer) => rootReducer.auth);
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (!localStorage.getItem(USER_LOGIN)) {
    alert("Bạn không có quyền truy cập vào trang!");
    return <Redirect to="/" />;
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogin");
    window.location.replace("/");
  };

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
        {
          key: "4",
          label: (
            <button
              style={{
                display: "block",
                padding: "10px 0",
                color: "#62646a",
                fontSize: "18px",
                fontWeight: "700",
                outline: "none",
                border: " 1px solid transparent",
                backgroundColor: " transparent",
              }}
              onClick={logout}
              type="button"
              className="logout"
            >
              Log Out
            </button>
          ),
        },
      ]}
    />
  );

  let Component = props.component;

  return (
    <Route
      exact
      path={props.path}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Layout
              style={{
                minHeight: "100vh",
              }}
            >
              <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
              >
                <div className="logo p-3">
                  <NavLink to="/">
                    <img
                      src="https://www.brandinginasia.com/wp-content/uploads/2021/02/Fiverr-logo-Branding-in-Asia.jpg"
                      alt="..."
                      style={{ width: "100%", height: "100px" }}
                    />
                  </NavLink>
                </div>
                <Menu theme="dark" mode="inline">
                  <Menu.SubMenu key={23} title="Users" icon={<RobotOutlined />}>
                    <Menu.Item key="16" icon={<RedditOutlined />}>
                      <NavLink to={`/admin/user/infouser/${userLogin._id}`}>
                        User Info
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item key="12" icon={<UserOutlined />}>
                      <NavLink to="/admin/user">Users</NavLink>
                    </Menu.Item>
                    <Menu.Item key="13" icon={<SubnodeOutlined />}>
                      <NavLink to="/admin/user/adduser">Add Users</NavLink>
                    </Menu.Item>
                  </Menu.SubMenu>
                  <Menu.SubMenu key={25} title="Gigs" icon={<GitlabOutlined />}>
                    <Menu.Item key="45" icon={<AuditOutlined />}>
                      <NavLink to="/admin/gig">Gigs</NavLink>
                    </Menu.Item>
                    <Menu.Item key="46" icon={<CarOutlined />}>
                      <NavLink to="/admin/gig/addgig">Add New</NavLink>
                    </Menu.Item>
                  </Menu.SubMenu>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="d-flex justify-content-end site-layout-background"
                  style={{
                    padding: 0,
                  }}
                >
                  <Fragment>
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space className="btn__login btn">
                          <i className="fa-solid fa-user-ninja"></i> Hi
                          {userLogin.name}
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                    <div>
                      <NavLink className="btn__login mr-5 ml-2 btn" to="/">
                        <i className="fa-solid fa-house"></i> Home Page
                      </NavLink>
                    </div>
                  </Fragment>
                </Header>
                <Content
                  style={{
                    margin: "0 16px",
                  }}
                >
                  <Breadcrumb
                    style={{
                      margin: "16px 0",
                    }}
                  >
                    {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                  </Breadcrumb>
                  <div
                    className="site-layout-background"
                    style={{
                      padding: 24,
                      minHeight: 360,
                    }}
                  >
                    <Component {...propsRoute} />
                  </div>
                </Content>
                <Footer
                  style={{
                    textAlign: "center",
                  }}
                ></Footer>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};
