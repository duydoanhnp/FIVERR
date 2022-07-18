import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/setting";

const initialState = {
    detailJobs: {}
};

const detailJob = createSlice({
  name: "detailJob",
  initialState,
  reducers: {
    setApiDetailJob: (state, action) => {
      state.detailJobs = action.payload;
    },
  },
});

export const { setApiDetailJob } = detailJob.actions;
export default detailJob.reducer;

//---action thunk setApiDetailJob---

export const getDetailJob = (iddetail) => {
  return async (dispatch) => {
    try {
      const result = await http.get(`/api/jobs/${iddetail}`);
      console.log("getDetailJob", result);
      dispatch(setApiDetailJob(result.data));
    } catch (err) {
      console.log(err);
    }
  };
};


  
