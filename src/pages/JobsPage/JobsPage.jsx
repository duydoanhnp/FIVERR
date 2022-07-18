import "../../scss/_JobsPage.scss";
import { Pagination, Space } from "antd";
import Header from "../../templates/Header/Header";
import Footer from "../../templates/Footer/Footer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getJobListbySearch } from "../../redux/reducers/jobList";
import defaultSubJob from "../../assets/images/defaultSubJob.png";

const JobsPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [postPerPgae, setPostPerPgae] = useState(16);

  console.log(location);

  const { arrJobList } = useSelector((reducer) => reducer.jobList);

  const searchName = new URLSearchParams(location.search).get("name");

  console.log("searchName", searchName);

  useEffect(() => {
    dispatch(getJobListbySearch(searchName));
    window.scrollTo(0, 0);
  }, [searchName]);

  const indexOfLastPage = page + postPerPgae;
  const indexOfFisrtPage = indexOfLastPage - postPerPgae;
  const currentPosts = arrJobList.slice(indexOfFisrtPage, indexOfLastPage);

  const renderJobList = () => {
    return currentPosts.map((jobs, index) => {
      return (
        <Link
          to={`/detail/subjob/${jobs._id}`}
          className="jobscontent"
          key={index}
        >
          <img src={jobs.image ? jobs.image : defaultSubJob} alt="..." />
          <div className="text">
            <span className="content">{jobs.name}</span>
            <div className="text-bottom">
              <p className="left">
                {jobs.rating}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1792 1792"
                  width="15"
                  height="15"
                >
                  <path
                    fill="currentColor"
                    d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                  ></path>
                </svg>
              </p>
              <p className="right">US${jobs.price}</p>
            </div>
          </div>
        </Link>
      );
    });
  };

  return (
    <div className="jobpage">
      <Header />
      <section className="results">
        <h3>Results for "{searchName}"</h3>
      </section>
      <section className="sumjobs">
        <p>{arrJobList.length} services available</p>
      </section>
      <section className="jobdetail">
        <div className="jobmain">{renderJobList()}</div>
        <div className="space">
          <Space>
            <Pagination
              onChange={(value) => setPage(value)}
              pageSize={postPerPgae}
              total={arrJobList.length}
              current={page}
            />
          </Space>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default JobsPage;
