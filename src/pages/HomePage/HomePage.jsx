import React, { useEffect, useState } from "react";
import {
  MenuOutlined,
  CheckCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "../../scss/_HomePage.scss";
import Reviews from "./Reviews";
import HomeCarousel from "./HomeCarousel";
import Services from "./ServicesHome/Services";
import Footer from "../../templates/Footer/Footer";
import Servicesres1 from "./ServicesHome/Servicesres1";
import Servicesres2 from "./ServicesHome/Servicesres2";
import { useSelector, useDispatch } from "react-redux";
import { getApiMainJob } from "../../redux/reducers/jobPage";
import { Link, useHistory, NavLink } from "react-router-dom";
import { Menu, Button, Drawer, Dropdown, Space } from "antd";

export default function HomePage(props) {
  const { userLogin } = useSelector((reducer) => reducer.auth);
  console.log("user", userLogin);
  const [search, setSearch] = useState();
  const history = useHistory();
  const { SubMenu } = Menu;
  const { arrTypeJob } = useSelector((reducer) => reducer.jobPage);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogin");
    window.location.replace("/");
  };

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const searchJob = () => {
    console.log(search.trim());
    if (search.trim()) history.push(`/joblist?name=${search}`);
  };

  const enterSearch = (event) => {
    const { keyCode } = event;
    console.log(keyCode);
    if (keyCode === 13) searchJob();
  };

  const changeSearchInput = (event) => {
    const valueSearch = event.target.value;
    setSearch(valueSearch);
  };

  const renderMainJob = () => {
    return arrTypeJob.map((job, index) => {
      return (
        <Link className="content-job" to={`/${job.name}`} key={index}>
          <img
            src={`./images/${job.name}.svg`}
            alt="..."
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "./images/defaultExplore.svg";
            }}
          />
          <div className="boder"></div>
          <div className="job-name">{job.name}</div>
        </Link>
      );
    });
  };

  const menu = (
    <Menu
      items={
        userLogin.role === "ADMIN"
          ? [
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
            ]
          : [
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
                    to={`/admin/user/infouser/${userLogin._id}`}
                  >
                    Personal Detail
                  </NavLink>
                ),
              },
              {
                key: "3",
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
            ]
      }
    />
  );

  useEffect(() => {
    dispatch(getApiMainJob());
  }, []);
  return (
    <div>
      <header className="header-main">
        <div className="header-main-detail">
          <div className="logo">
            <a href="/">
              <span>fiverr</span>
              <span className="doc">.</span>
            </a>
          </div>
          <nav>
            <a href="#business">Fiverr Business</a>
            <a href="#explore">Explore</a>
            <a href="#seller">Become a Seller</a>
            {!userLogin?._id && (
              <Link to={"/login"} className="signin">
                Sign in
              </Link>
            )}
            {!userLogin?._id && (
              <Link to={"/register"} className="join">
                Join
              </Link>
            )}
            {userLogin?._id && (
              <Dropdown overlay={menu} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space className="btn__login btn">
                    <i className="fa-solid fa-user-ninja"></i> Hi
                    {userLogin.name}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            )}
          </nav>
        </div>
        <div className="header-main-responsive-1">
          <div className="btn">
            <Button onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <Drawer
              headerStyle={{ margin: 0 }}
              bodyStyle={{ margin: 0 }}
              closable={false}
              title={
                !userLogin?._id ? (
                  <Link to="/register">
                    <span>Join Fiverr</span>
                  </Link>
                ) : (
                  <button onClick={logout} type="button">
                    Log Out
                  </button>
                )
              }
              placement="left"
              onClose={onClose}
              visible={visible}
              size="200"
            >
              <ul type="none">
                {!userLogin?._id && (
                  <li>
                    <Link to="/login">
                      <p>Sign in</p>
                    </Link>
                  </li>
                )}
                <li>
                  <Menu mode="inline">
                    <SubMenu key="submenu" title="Catgories">
                      {arrTypeJob.map((typejob, index) => {
                        return (
                          <SubMenu key={typejob._id} title={typejob.name}>
                            {typejob.subTypeJobs.map((subjob, index) => {
                              return (
                                <Menu.Item key={subjob._id}>
                                  <Link to={`/${typejob.name}/${subjob._id}`}>
                                    {subjob.name}
                                  </Link>
                                </Menu.Item>
                              );
                            })}
                          </SubMenu>
                        );
                      })}
                    </SubMenu>
                  </Menu>
                </li>
              </ul>
            </Drawer>
          </div>
          <a href="/">
            <img src="./images/Fiverr_Logo.jpg" alt="Fiverr_Logo" />
          </a>
          {!userLogin?._id && (
            <Link to="/register">
              <span className="join">Join</span>
            </Link>
          )}
          {userLogin?._id && (
            <Dropdown overlay={menu} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space className="btn__login btn">
                  <i className="fa-solid fa-user-ninja"></i> Hi
                  {userLogin.name}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          )}
        </div>
        <div className="header-main-responsive-2">
          <div className="left">
            <Button onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <Drawer
              headerStyle={{ margin: 0 }}
              bodyStyle={{ margin: 0 }}
              closable={false}
              title={
                !userLogin?._id ? (
                  <Link to="/register">
                    <span>Join Fiverr</span>
                  </Link>
                ) : (
                  <button onClick={logout} type="button">
                    Log Out
                  </button>
                )
              }
              placement="left"
              onClose={onClose}
              visible={visible}
              size="200"
            >
              <ul type="none">
                {!userLogin?._id && (
                  <li>
                    <Link to="/login">
                      <p>Sign in</p>
                    </Link>
                  </li>
                )}
                <li>
                  <Menu mode="inline">
                    <SubMenu key="submenu" title="Catgories">
                      {arrTypeJob.map((typejob, index) => {
                        return (
                          <SubMenu key={typejob._id} title={typejob.name}>
                            {typejob.subTypeJobs.map((subjob, index) => {
                              return (
                                <Menu.Item key={subjob._id}>
                                  <Link to={`/${typejob.name}/${subjob._id}`}>
                                    {subjob.name}
                                  </Link>
                                </Menu.Item>
                              );
                            })}
                          </SubMenu>
                        );
                      })}
                    </SubMenu>
                  </Menu>
                </li>
              </ul>
            </Drawer>
            <a href="/">
              <img src="./images/Fiverr_Logo.jpg" alt="Fiverr_Logo" />
            </a>
          </div>
          <div className="right">
            {!userLogin?._id && (
              <Link to="/login">
                <span className="signin">Sign in</span>
              </Link>
            )}
            {!userLogin?._id && (
              <Link to="/register">
                <span className="join">Join</span>
              </Link>
            )}
            {userLogin?._id && (
              <Dropdown overlay={menu} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space className="btn__login btn">
                    <i className="fa-solid fa-user-ninja"></i> Hi
                    {userLogin.name}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            )}
          </div>
        </div>
        <HomeCarousel />
        <div className="search">
          <div className="search-content">
            <div className="search-text">
              <span>Find the perfect </span>
              <i>freelance</i>
              <br />
              <span>services for your business</span>
              <br />
            </div>
            <div className="search-btn">
              <input
                placeholder="Try'building mobile app'"
                type="text"
                onChange={changeSearchInput}
                onKeyUp={enterSearch}
              />
              <button onClick={searchJob} className="btn-search" type="button">
                Search
              </button>
            </div>
            <div className="popular">
              <p>Popular:</p>
              <Link className="text" to="/joblist?name=design">
                <span className="webslte-design">Webslte Design</span>
              </Link>
              <Link className="text" to="/joblist?name=WordPress">
                <span className="world-press">WordPress</span>
              </Link>
              <Link className="text" to="/joblist?name=logo%20design">
                <span className="logo-design">Logo Design</span>
              </Link>
              <Link className="text" to="/joblist?name=nft%20art">
                <span className="nft">NFT Art</span>
              </Link>
            </div>
            <div className="search-btn-responsive">
              <input
                placeholder="Try'building mobile app'"
                type="text"
                onChange={changeSearchInput}
                onKeyUp={enterSearch}
              />
              <br />
              <button className="btn-search" type="button" onClick={searchJob}>
                Search
              </button>
            </div>
          </div>
        </div>
      </header>
      <section className="trusted-by">
        <div className="trusted-by-main">
          <span className="text">Trusted by:</span>
          <ul className="branch" type="none">
            <li>
              <img src="./images/facebook_logo.png" alt="..." />
            </li>
            <li>
              <img src="./images/google_logo.png" alt="..." />
            </li>
            <li>
              <img src="./images/netflix_logo.png" alt="..." />
            </li>
            <li>
              <img src="./images/pandg_logo.png" alt="..." />
            </li>
            <li>
              <img src="./images/paypal_logo.png" alt="..." />
            </li>
          </ul>
        </div>
      </section>
      <section className="services-services">
        <div className="services-main">
          <Services />
        </div>
        <div className="services-responsive-1">
          <Servicesres1 />
        </div>
        <div className="services-responsive-2">
          <Servicesres2 />
        </div>
      </section>
      <section className="introduce">
        <div className="introduce-main">
          <div className="introduce-item-1">
            <h2>A whole world of freelance talent at your fingertips</h2>
            <div>
              <span className="icon">
                <CheckCircleOutlined />
              </span>
              <h6>The best for every budget</h6>
            </div>
            <span>
              Find high-quality services at every price point. No
              <br /> hourly rates, just project-based pricing.
            </span>
            <br />
            <div>
              <span className="icon">
                <CheckCircleOutlined />
              </span>
              <h6>Quality work done quickly</h6>
            </div>
            <span>
              Find the right freelancer to begin working on your
              <br /> project within minutes.
            </span>
            <br />
            <div>
              <span className="icon">
                <CheckCircleOutlined />
              </span>
              <h6>Protected payments, every time</h6>
            </div>
            <span>
              Always know what you'll pay upfront. Your payment
              <br /> isn't released until you approve the work.
            </span>
            <br />
            <div>
              <span className="icon">
                <CheckCircleOutlined />
              </span>
              <h6>24/7 support</h6>
            </div>
            <span>
              Questions? Our round-the-clock support team is
              <br />
              available to help anytime, anywhere.
            </span>
          </div>
          <div className="introduce-item-2">
            <video controls src="./videos/introduce.mp4"></video>
          </div>
        </div>
      </section>
      <section className="explore" id="explore">
        <h2>Explore the marketplace</h2>
        <div className="explore-item">{renderMainJob()}</div>
      </section>
      <section className="fiverrbusiness" id="business">
        <div className="fiverrbusiness-item">
          <div className="fiverrbusiness-content">
            <h2>
              A business solution designed for <i>teams</i>
            </h2>
            <p>
              Ucpgrade to a curated experience packed with tools
              <br /> and benefits, dedicated to businesses
            </p>
            <ul type="none">
              <li>
                <span className="icon">
                  <CheckCircleOutlined />
                </span>

                <span className="text">
                  Connect to freelancers with proven business experience
                </span>
              </li>
              <li>
                <span className="icon">
                  <CheckCircleOutlined />
                </span>
                <span className="text">
                  Get matched with the perfect talent by a customer success
                  manager
                </span>
              </li>
              <li>
                <span className="icon">
                  <CheckCircleOutlined />
                </span>
                <span className="text">
                  Manage teamwork and boost productivity with one powerful
                  workspace
                </span>
              </li>
            </ul>
            <Link to={"/Business"} className="button">
              Explore Fiverr Business
            </Link>
          </div>
          <div className="fiverrbusiness-img">
            <img src="./images/business-desktop.png" alt="..." />
          </div>
        </div>
      </section>
      <section className="review">
        <Reviews />
      </section>
      <section className="fiverrjoin" id="seller">
        <div className="fiverrjoin-main">
          <div className="fiverrjoin-content">
            <h2>
              Find the <i>talent</i> needed to <br />
              get your business <i>growing</i>.
            </h2>
            <Link className="button" to={"/login"}>
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
