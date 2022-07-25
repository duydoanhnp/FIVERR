import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/setting";

const initialState = {
  arrJobList: []
};

const jobList = createSlice({
  name: "jobList",
  initialState,
  reducers: {
    setApiJobList: (state, action) => {
      state.arrJobList = action.payload;
    },
  },
});

export const { setApiJobList } = jobList.actions;
export default jobList.reducer;

//---action thunk arrJobList---

export const getJobListbySearch = (nameSearch) => {
  return async (dispatch) => {
    try {
      const result = await http.get(`/api/jobs/by-name?name=${nameSearch}`);
      if (!result.data) throw "Error";
      console.log("getJobListbySearch", result);
      dispatch(setApiJobList(result.data));
    } catch (err) {
      console.log(err);
    }
  };
};


  
