import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/setting";

const initialState = {
  subTypeJob: []
};

const subTypeJob = createSlice({
  name: "subTypeJob",
  initialState,
  reducers: {
    getSubTypeJob: (state, action) => {
      state.subTypeJob = action.payload;
    },
  },
});

export const { getSubTypeJob } = subTypeJob.actions;
export default subTypeJob.reducer;

//---action thunk subTypeJob---

export const getApiSubJob = (id) => {

    return async (dispatch) => {
        try{
            let result = await http.get(`/api/jobs/by-sub-type?subType=${id}`);
            console.log('getSubTypeJob', result);
            const action = getSubTypeJob(result.data);
            dispatch(action);
        }catch(err){
            console.log(err);
        }
    }
}
