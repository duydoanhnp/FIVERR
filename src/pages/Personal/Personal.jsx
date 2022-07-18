import React, { memo, useEffect } from "react";
import { Card, Col, Row } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userInfoAPI } from "../../redux/reducers/userReducer";
import { getWorkPersonal, xoaCongViec } from "../../redux/reducers/workReducer";

function Personal(props) {
  const { userInfo } = useSelector((rootReducer) => rootReducer.auth);
  const { workPersonal } = useSelector((state) => state.workReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    let { id } = props.match.params;
    const action = userInfoAPI(id);
    dispatch(action);
  }, []);
  useEffect(() => {
    const action = getWorkPersonal();
    dispatch(action);
  }, []);
  const renderWork = () => {
    const arrWork = workPersonal.filter(
      (item) => item.usersBooking === userInfo._id
    );
    const arrWorkImage = arrWork.filter((item) => item.image);
    return arrWorkImage.map((item, key) => {
      return (
        <Card
          style={{ boxShadow: "0 0 7px #d6d6d6", width: "100%" }}
          className="mt-3"
          title={
            <div style={{ position: "relative" }} className="personalgig__job">
              <div
                style={{ backgroundImage: `url(${item.image})` }}
                className="personal__img"
              ></div>
              <div className="ml-2 personal_content">
                <h1>
                  {item.name.length > 50
                    ? item.name.substr(0, 40) + "..."
                    : item.name}
                </h1>
                <span>{item.rating}</span>
                <i style={{ color: "#ffc107" }} className="ml-1 fa fa-star"></i>
                <br />
                <span
                  style={{
                    color: "#19a463",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  {item.proServices ? "Pro Services" : ""}
                </span>
                <span
                  style={{
                    color: "#19a463",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                  className="d-block"
                >
                  {item.localSellers ? "Local Sellers" : ""}
                </span>
                <span
                  style={{
                    color: "#19a463",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  {item.onlineSellers ? "Online Sellers" : ""}
                </span>
                <span
                  style={{
                    color: "#19a463",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  {item.deliveryTime ? "Delivery Time" : ""}
                </span>
              </div>
              <div className="personal__btn">
                <a href="" className="btn-detail btn btn-success">
                  View detail
                </a>
                <NavLink
                  to={`/admin/gig/editgig/${item._id}`}
                  className="btn-edit btn btn-warning"
                >
                  Edit
                </NavLink>
                <a
                  href=""
                  onClick={() => {
                    dispatch(xoaCongViec(item._id));
                  }}
                  className="btn-delete btn btn-danger"
                >
                  X
                </a>
              </div>
            </div>
          }
        ></Card>
      );
    });
  };
  return (
    <section className="personal">
      <div className="container">
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col className="gutter-row" xs={24} sm={24} md={24} lg={7}>
            <section className="personal__info">
              <Card
                style={{ boxShadow: "0 0 7px #d6d6d6", width: "100%" }}
                className="mt-5"
                title={
                  <div>
                    <div className="personal__avatar">
                      <a>L</a>
                      <div className="personal__camera">
                        <i className="fa-solid fa-camera"></i>
                      </div>
                    </div>
                    <div className="personal__name">
                      <h1>{userInfo.name}</h1>
                      <a className="personal__icon" href="">
                        <i className="fa-solid fa-pen"></i>
                      </a>
                      <br />
                      <a className="btn btn-primary" href="#">
                        Preview Fiverr Profile
                      </a>
                    </div>
                  </div>
                }
                extra={
                  <span className="personal__badge badge badge-pill badge-success">
                    · Online
                  </span>
                }
              >
                <div className="personal__detail">
                  <div className="personal__left">
                    <span>
                      <i className="fa-solid fa-location-dot"></i>
                      From
                    </span>
                    <br />
                    <span>
                      <i className="fa-solid fa-user-astronaut"></i>
                      Member since
                    </span>
                  </div>
                  <div className="personal__right">
                    <span>Vietnam</span>
                    <br />
                    <span>May 2022</span>
                  </div>
                </div>
              </Card>
              <Card
                className="mt-4 personalinfo__learn"
                style={{ boxShadow: "0 0 7px #d6d6d6", width: "100%" }}
                title={
                  <div className="personal__learn">
                    <div>
                      <img
                        src="https://fiverr-res.cloudinary.com/image/upload/q_auto,f_png/v1/attachments/generic_asset/asset/6bef0aaa4d62dcf41383658e5e3211ee-1571214998624/fiverrlearn_logo.svg"
                        alt="..."
                      />
                    </div>
                    <div className="personallearn__detail">
                      <div>
                        <img
                          src="https://npm-assets.fiverrcdn.com/assets/@fiverr-private/fiverr_learn/enroll-icon.69b770f.svg"
                          alt="..."
                        />
                      </div>
                      <h1>Earn badges and stand out</h1>
                      <br />
                      <span>Boost your sales, by boosting your expertise.</span>
                      <br />
                      <a
                        target="_blank"
                        href="https://www.fiverr.com/fiverrlearn/thinkific"
                        className="btn btn-success"
                      >
                        Enroll Now
                      </a>
                    </div>
                  </div>
                }
              ></Card>

              <Card
                className="mt-4 personalinfo__desc"
                style={{ boxShadow: "0 0 7px #d6d6d6", width: "100%" }}
              >
                <div className="personal__desc">
                  <div className="personal__left">
                    <span>Description</span>
                  </div>
                  <div className="personal__right">
                    <a href="">Edit Description</a>
                  </div>
                  <div className="personal__separator"></div>
                </div>
                <div className="personal__desc">
                  <div className="personal__left">
                    <span>Languages</span>
                    <p>
                      English -<span className="subtitle ml-1">Basic</span>
                      <a href="">
                        <i className="fa-solid fa-pen"></i>
                      </a>
                    </p>
                  </div>
                  <div className="personal__right">
                    <a href="">Add New</a>
                  </div>
                  <div className="personal__separator"></div>
                </div>
                <div className="personal__desc">
                  <div className="personal__left">
                    <span>Linked Accounts</span>
                    <br />
                    <a
                      target="_blank"
                      href="https://www.facebook.com/"
                      className="personal__apps"
                    >
                      <i className="mr-3 fa-solid fa-plus"></i>
                      Facebook
                    </a>
                    <a
                      target="_blank"
                      href="https://www.google.com/"
                      className="personal__apps"
                    >
                      <i className="mr-3 fa-solid fa-plus"></i>
                      Google
                    </a>
                    <a
                      target="_blank"
                      href="https://dribbble.com/"
                      className="personal__apps"
                    >
                      <i className="mr-3 fa-solid fa-plus"></i>
                      Dribbble
                    </a>
                    <a
                      target="_blank"
                      href="https://stackoverflow.com/"
                      className="personal__apps"
                    >
                      <i className="mr-3 fa-solid fa-plus"></i>
                      Stack Overflow
                    </a>
                    <a
                      target="_blank"
                      href="https://github.com/"
                      className="personal__apps"
                    >
                      <i className="mr-3 fa-solid fa-plus"></i>
                      GitHub
                    </a>
                    <a
                      target="_blank"
                      href="https://vimeo.com/"
                      className="personal__apps"
                    >
                      <i className="mr-3 fa-solid fa-plus"></i>
                      Vimeo
                    </a>
                    <a
                      target="_blank"
                      href="https://twitter.com/"
                      className="personal__apps"
                    >
                      <i className="mr-3 fa-solid fa-plus"></i>
                      Twitter
                    </a>
                  </div>

                  <div className="personal__separator"></div>
                </div>
                <div className="personal__desc">
                  <div className="personal__left">
                    <span>Skills</span>
                    <p>
                      <span className="subtitle">Add your Skills.</span>
                    </p>
                  </div>
                  <div className="personal__right">
                    <a href="">Add New</a>
                  </div>
                  <div className="personal__separator"></div>
                </div>
                <div className="personal__desc">
                  <div className="personal__left">
                    <span>Education</span>
                    <p>
                      <span className="subtitle">Add your Education.</span>
                    </p>
                  </div>
                  <div className="personal__right">
                    <a href="">Add New</a>
                  </div>
                  <div className="personal__separator"></div>
                </div>
                <div className="personal__desc">
                  <div className="personal__left">
                    <span>Certification</span>
                    <p>
                      <span className="subtitle">Add your Certification.</span>
                    </p>
                  </div>
                  <div className="personal__right">
                    <a href="">Add New</a>
                  </div>
                </div>
              </Card>
              <Card
                className="mt-4 personalinfo__share"
                title={
                  <div className="personal__share">
                    <h1>Shared activity information</h1>
                    <span>
                      In order to provide the best possible work and service,
                      <br /> some information about your activity on Fiverr may
                      be
                      <br />
                      shared with sellers. Manage settings
                    </span>
                  </div>
                }
                style={{ boxShadow: "0 0 7px #d6d6d6", width: "100%" }}
              ></Card>
            </section>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={24} lg={17}>
            <section className="personal__gig">
              <Card
                style={{ boxShadow: "0 0 7px #d6d6d6", width: "100%" }}
                className="mt-5"
                title={
                  <div className="personalgig__work">
                    <div>
                      <img
                        src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/062c31c4c3d8177e0a989389919ffd0d-1647342235681/office-building.gif"
                        alt="..."
                      />
                    </div>
                    <div>
                      <h1>Using Fiverr for work?</h1>
                      <span>
                        Expand your in-house capabilities with vetted
                        freelancers for every project.
                      </span>
                      <a
                        href="https://www.fiverr.com/business?source=discover_fiverr_business"
                        target="_blank"
                      >
                        Learn about Fiverr Business
                        <i className="ml-2 fa-solid fa-angle-right"></i>
                      </a>
                    </div>
                  </div>
                }
              ></Card>
              <Card
                style={{ boxShadow: "0 0 7px #d6d6d6", width: "100%" }}
                className="mt-3"
                title={
                  <div className="personalgig__create">
                    <div>
                      <span>
                        It seems that you don't have any active Gigs. Get
                        selling!
                      </span>
                    </div>
                    <div>
                      <a
                        href="https://www.fiverr.com/seller_onboarding/overview"
                        target="_blank"
                        className="btn btn-success"
                      >
                        Create a New Gig
                      </a>
                    </div>
                  </div>
                }
              ></Card>
              {renderWork()}
            </section>
          </Col>
        </Row>
      </div>
    </section>
  );
}
export default memo(Personal);
