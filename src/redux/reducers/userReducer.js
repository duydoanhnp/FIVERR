import { createSlice } from '@reduxjs/toolkit'
import { history } from '../../App';
import { TOKEN, http, USER_LOGIN } from '../../util/setting';

// Kiểm tra trong localStorage đã có thông tin đăng nhập hay chưa, nếu có rồi thì không cần đăng nhập lại
let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
  }
const initialState = {
    userLogin: user,
    userRegister : {},
    userInfo: {},
    arrUser: [],


}

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
        loginAPI : (state, action) =>{
            console.log(action.payload);
            state.userLogin = action.payload;
        },
        registerAPI : (state, action) =>{
            state.userRegister = action.payload
        },
        infoAPI: (state,action) =>{
            state.userInfo = action.payload
        },
        getArrUser: (state,action) =>{
            state.arrUser = action.payload
        }
  }
});

export const {getArrUser ,loginAPI,registerAPI, infoAPI} = userReducer.actions

export default userReducer.reducer


export const userLoginAPI = (userLogin) =>{
    return async dispatch =>{
        try{
            let result = await http.post('api/auth/signin', userLogin)
            console.log(result.data);
            let usLogin = result.data.user
            localStorage.setItem(USER_LOGIN, JSON.stringify(usLogin))
            localStorage.setItem(TOKEN, result.data.token)
            const action = loginAPI(usLogin)
            dispatch(action)
            alert("Đăng nhập thành công")
            history.push('/'); 
        }catch(error){
            alert(
                "Đăng nhập không thành công, tên đăng nhập hoặc mật khẩu không chính xác"
              );
            console.log(error.response?.data);
                
        }
    }
}

export const userRegisterAPI = (userRegister) =>{
    return async dispatch =>{
        try{
          let result = await http.post("/api/auth/signup", userRegister)
          console.log(result.data);
          const action = registerAPI(userRegister)
          dispatch(action)
          alert("Đăng ký thành công")
          history.push('/login'); 
            
        }
        catch(error){
            alert(
                "Đăng ký không thành công"
              );
            console.log(error.response?.data);
        }
    }
}


export const userInfoAPI = (userID) =>{
    return async dispatch =>{
        try{
            let result = await http.get(`/api/users/${userID}`)
            const action = infoAPI(result.data)
            dispatch(action)

        }  
        catch(error){
            console.log(error.response?.data);
        }
    }
}


export const getArrUserAPI = (name = "") =>{
    return async dispatch =>{
        try{
            if(name.toLowerCase().trim() !== ""){
                let result = await http.get(`/api/users/${name}`)
                dispatch(getArrUser(result.data))
            }else{
                let result = await http.get(`/api/users`)
                dispatch(getArrUser(result.data))
            }
        }  
        catch(error){
            console.log(error.response?.data);
        }
    }
}

export const themNguoiDung = (form) =>{
    return async dispatch =>{
        try{
            let result = await http.post(`/api/users`,  form)
            alert("Thêm người dùng thành công!")
            history.push("/admin/user")
        }  
        catch(error){
            console.log(error.response?.data);
        }
    }
}

export const timKiemUser = (name) =>{
    return async dispatch =>{
        try{
            let result = await http.get(`/api/users/pagination-search?name=${name}&skip=0&limit=2`)
            dispatch(getArrUser(result.data))
        }  
        catch(error){
            console.log(error.response?.data);
        }
    }
}

export const xoaNguoiDung = (id) =>{
    return async dispatch =>{
        try{
            if(window.confirm("Bạn có muốn xóa không!")){
                let result = await http.delete(`/api/users/${id}`)
                dispatch(getArrUserAPI())
            }
        }  
        catch(error){
            console.log(error.response?.data);
        }
    }
}

export const editNguoiDung = (id,values) =>{
    return async dispatch =>{
        try{
            let result = await http.put(`/api/users/${id}`,values)
            alert("Cập nhật người dùng thành công!")
            history.push("/admin/user")
            
        }  
        catch(error){
            console.log(error.response?.data);
        }
    }
}

