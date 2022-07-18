import React, { useEffect } from "react";
import "../../scss/_DetailJobsPage.scss";
import { http } from "../../util/setting";
import { useParams } from "react-router-dom";
import Header from "../../templates/Header/Header";
import Footer from "../../templates/Footer/Footer";
import Comment from "../../pages/DetailJobsPage/Comment";
import { useDispatch, useSelector } from "react-redux";
import { getDetailJob } from "../../redux/reducers/detailJob";
import defaultSubJob from "../../assets/images/defaultSubJob.png";

export default function DetailJobsPage(props) {
  const dispatch = useDispatch();
  const { iddetail } = useParams();

  const { userLogin } = useSelector((state) => state.auth);

  const { detailJobs } = useSelector((reducer) => reducer.detailJob);
  console.log("detailJobs", detailJobs);

  const hiding = async () => {
    try {
      const result = await http.patch(`/api/jobs/booking/${iddetail}`);
      alert("Succeed for hiring !");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getDetailJob(iddetail));
  }, [iddetail]);

  return (
    <div className="detailjob">
      <Header />
      <section className="content-main">
        <div className="content-items">
          <div className="content-left">
            <h3>{detailJobs.name}</h3>
            <p>
              <span>{detailJobs.rating}</span>
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
            <img
              src={detailJobs.image ? detailJobs.image : defaultSubJob}
              alt="..."
            />
          </div>
          <div className="content-right">
            <div className="content-right-detail">
              {!userLogin?._id && <div className="overlay" />}
              <h3>Service Package</h3>
              <div className="price-items">
                <p className="text">Package Price:</p>
                <span className="price">US${detailJobs.price}</span>
              </div>
              <div className="button">
                <button onClick={hiding} type="button">
                  Comfirm & Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Comment jobId={iddetail} isLogin={!!userLogin?._id} />
      <Footer />
    </div>
  );
}
