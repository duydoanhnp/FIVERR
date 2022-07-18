import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/setting";

const initialState = {
  subJobs: [],
};

const subJob = createSlice({
  name: "subJob",
  initialState,
  reducers: {
    setSubJobs: (state, action) => {
      state.subJobs = action.payload;
    },
  },
});

export const { setSubJobs } = subJob.actions;
export default subJob.reducer;

//---action thunk subJobs---

export const getSubJobs = (id) => {
  return async (dispatch) => {
    try {
      let result = await http.get(`/api/sub-type-jobs/${id}`);
      console.log("getSubJobs", result);
      const action = setSubJobs(result.data);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
