import React from "react";
import "../../scss/_SubJobsPage.scss";
import { Pagination, Space } from "antd";
import { useEffect, useState } from "react";
import Header from "../../templates/Header/Header";
import Footer from "../../templates/Footer/Footer";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubJobs } from "../../redux/reducers/subJobs";
import { getApiSubJob } from "../../redux/reducers/subTypeJob";
import defaultSubJob from "../../assets/images/defaultSubJob.png";

export default function SubJobsPage(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [postPerPgae, setPostPerPgae] = useState(16);

  const { subTypeJob } = useSelector((reducer) => reducer.subTypeJob);
  const { subJobs } = useSelector((reducer) => reducer.subJobs);

  const indexOfLastPage = page + postPerPgae;
  const indexOfFisrtPage = indexOfLastPage - postPerPgae;
  const currentSubPosts = subTypeJob.slice(indexOfFisrtPage, indexOfLastPage);

  const renderSubJobList = () => {
    return currentSubPosts.map((subjobs, index) => {
      return (
        <Link
          to={`/detail/subjob/${subjobs._id}`}
          className="jobscontent"
          key={index}
        >
          <img src={subjobs.image ? subjobs.image : defaultSubJob} alt="..." />
          <div className="text">
            <span className="content">{subjobs.name}</span>
            <div className="text-bottom">
              <p className="left">
                {subjobs.rating}
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
              <p className="right">US${subjobs.price}</p>
            </div>
          </div>
        </Link>
      );
    });
  };

  useEffect(() => {
    dispatch(getApiSubJob(id));
    dispatch(getSubJobs(id));
  }, [id]);

  return (
    <div className="subjobs">
      <Header />
      <section className="subjobresults">
        <h3>{subJobs.name}</h3>
      </section>
      <section className="sumsubjobs">
        <p>{subTypeJob.length} services available</p>
      </section>
      <section>
        <section className="subjobdetail">
          <div className="subjobmain">{renderSubJobList()}</div>
          <div className="space">
            <Space>
              <Pagination
                onChange={(value) => setPage(value)}
                pageSize={postPerPgae}
                total={subTypeJob.length}
                current={page}
              />
            </Space>
          </div>
        </section>
      </section>
      <Footer />
    </div>
  );
}
