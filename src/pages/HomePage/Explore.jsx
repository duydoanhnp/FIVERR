import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getApiMainJob } from "../../redux/Reducers/typeJob";

export default function Explore(props) {
  const { arrTypeJob } = useSelector((reducer) => reducer.typeJob);
  const dispatch = useDispatch();
  useEffect(() => {
    const actionThunk = getApiMainJob();
    dispatch(actionThunk);
  }, []);

  const renderTypeJob = () => {
    return arrTypeJob.map((job, index) => {
      return (
        <div key={index}>
            <p>{job.name}</p>
        </div>
      );
    });
  };

  return (
    <div className="explore-main">
      <h2>Explore the marketplace</h2>
      <div className="explore-content">
        {renderTypeJob()}
      </div>
    </div>
  );
}
