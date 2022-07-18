import { createSlice } from '@reduxjs/toolkit'
import { history } from '../../App';
import { http } from '../../util/setting';

const initialState = {
    bookingJob: [],
    arrWork: [],
    workDetail: {},
    workPersonal: []
}

const workReducer = createSlice({
  name: 'workReducer',
  initialState,
  reducers: {
    getListWork: (state,action) =>{
        state.arrWork = action.payload
    },
    getWorkDetailAPI: (state,action) =>{
        state.workDetail = action.payload
    },
    getWorkPersonalAPI: (state,action) =>{
        state.workPersonal = action.payload
    }
  }
});

export const {getListWork,getWorkDetailAPI,getWorkPersonalAPI} = workReducer.actions

export default workReducer.reducer

export const getWork = () =>{
    return async dispatch =>{
        try{
            let result = await http.get(`/api/jobs/by-user`)
        }
        catch(err){
            console.log(err.response?.data);
        }
    }
}


export const getArrWork = (tenCongViec = "") =>{
    return async dispatch =>{
        try{
            if(tenCongViec.toLowerCase().trim() !== ""){
                let result = await http.get(`/api/jobs/by-name?name=${tenCongViec}`)
                dispatch(getListWork(result.data))
            }else{
                let result = await http.get(`/api/jobs/by-name?name=`)
                dispatch(getListWork(result.data))
            }
        }
        catch(err){
            console.log(err.response?.data);
        }
    }
}


export const addNewWork = (thongTinCongViec) =>{
    return async dispatch =>{
        try{         
            let result = await http.post(`/api/jobs`,thongTinCongViec)
            alert("Thêm công việc thành công!")
            history.push("/admin/gig")
        }
        catch(err){
            console.log(err.response?.data);
        }
    }
}

export const xoaCongViec = (id) =>{
    return async dispatch =>{
        try{         
            if(window.confirm("Bạn muốn xóa không!")){
                let result = await http.delete(`/api/jobs/${id}`)
                dispatch(getArrWork())
            }
    
        }
        catch(err){
            console.log(err.response?.data);
        }
    }
}

export const getWorkDetail = (id) =>{
    return async dispatch =>{
        try{         
            let result = await http.get(`/api/jobs/${id}`)
            dispatch(getWorkDetailAPI(result.data))
    
        }
        catch(err){
            console.log(err.response?.data);
        }
    }
}



export const getWorkPersonal = () =>{
    return async dispatch =>{
        try{         
            let result = await http.get(`/api/jobs/`)
            dispatch(getWorkPersonalAPI(result.data))
    
        }
        catch(err){
            console.log(err.response?.data);
        }
    }
}


export const editCongViec = (id, values) =>{
    return async dispatch =>{
        try{         
            let result = await http.put(`/api/jobs/${id}`, values)
            alert("Update công việc thành công!")
            history.push("/admin/gig")
        }
        catch(err){
            console.log(err.response?.data);
        }
    }
}


export const editWorkImage = (id ,values) =>{
   return async dispatch =>{
        try{
            let result = await http.post(`/api/jobs/upload-image/${id}` , values)
            console.log("abvc");
            console.log(result.data);
        }
        catch(err){
            console.log(err);
        }
   }
}