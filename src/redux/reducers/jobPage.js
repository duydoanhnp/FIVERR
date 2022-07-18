import { createSlice } from "@reduxjs/toolkit";
import { http } from '../../util/setting';

const initialState = {
    arrTypeJob: [],
};

const jobPage = createSlice({
  name: 'jobPage',
  initialState,
  reducers: {
    getApiTypeJob: (state, action) => {
        state.arrTypeJob = action.payload;
    },
  },
});

export const {getApiTypeJob} = jobPage.actions;
export default jobPage.reducer;

//---action thunk arrTypeJob---

export const getApiMainJob = () => {

    return async dispatch => {
        try{
            let result = await http.get('/api/type-jobs');
            console.log('getApiMainJob', result);
            const action = getApiTypeJob(result.data);
            dispatch(action);
        }catch(err){
            console.log(err);
        }
    }
}


  

