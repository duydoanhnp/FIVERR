import { configureStore } from "@reduxjs/toolkit";
import jobList from "./reducers/jobList";
import jobPage from "./reducers/jobPage";
import subTypeJob from "./reducers/subTypeJob";
import detailJob from "./reducers/detailJob";
import subJobs from "./reducers/subJobs";
import loadingReducer from "./reducers/loadingReducer";
import userReducer from "./reducers/userReducer";
import workReducer from "./reducers/workReducer";

export const store = configureStore({
  reducer: {
    // khai bao state
    jobPage: jobPage,
    jobList: jobList,
    subTypeJob: subTypeJob,
    detailJob: detailJob,
    subJobs: subJobs,
    auth: userReducer,
    loadingReducer: loadingReducer,
    workReducer: workReducer,
  },
});
