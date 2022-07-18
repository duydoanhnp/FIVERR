import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Footer from "../../templates/Footer/Footer";
import Header from "../../templates/Header/Header";
import defaultSubJob from "../../assets/images/defaultSubJob.png";
import "../../scss/_TypeJobsPage.scss";

export default function TypeJobsPage() {
  const { mainTypeJobName } = useParams();
  const [subTypeJobs, setSubTypeJobs] = useState([]);
  const { arrTypeJob } = useSelector((reducer) => reducer.jobPage);

  const setSubTypeJob = () => {
    console.log("arrTypeJob", arrTypeJob);
    console.log("mainTypeJobName", mainTypeJobName);
    const mainTypeJob = arrTypeJob.find(
      (jobPage) => jobPage.name === mainTypeJobName
    );
    if (mainTypeJob) setSubTypeJobs(mainTypeJob.subTypeJobs);
  };

  useEffect(() => {
    if (arrTypeJob.length) setSubTypeJob();
    window.scrollTo(0, 0);
  }, [mainTypeJobName, arrTypeJob]);

  return (
    <div className="typejobspage">
      <Header />
      <div className="main-content">
        <h2>{mainTypeJobName}</h2>
        <div className="content-items">
          <div className="content-left">
            <h4>{mainTypeJobName}</h4>
            {subTypeJobs.map((subJob, index) => {
              return (
                <ul type="none">
                  <Link to={`/${mainTypeJobName}/${subJob._id}`} key={index}>
                    <li>{subJob.name}</li>
                  </Link>
                </ul>
              );
            })}
          </div>
          <div className="content-right">
            {subTypeJobs.map((subJob, index) => {
              return (
                <div className="content-main">
                  <Link to={`/${mainTypeJobName}/${subJob._id}`} key={index}>
                    <img
                      src={subJob.image ? subJob.image : defaultSubJob}
                      alt="..."
                    />
                    <p>{subJob.name}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
