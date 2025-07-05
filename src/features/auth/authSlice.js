import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI, registerUserAPI } from "./authAPI";

const initialState={
    user:null,
    token:localStorage.getItem('token') || null,
    role:localStorage.getItem('role') || null,
    status:'idle',
    error:null
};

export const loginUser=createAsyncThunk('auth/loginUser',async(formData)=>{
    const res=await loginUserAPI(formData);
    return res;
});

export const registerUser=createAsyncThunk('auth/registerUser',async(formData)=>{
    const res=await registerUserAPI(formData);
    return res;
})

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout(state){
            state.user=null;
            state.token=null;
            state.role=null;
            localStorage.clear();
        }
    },

    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.fulfilled,(state,action)=>{
            const {token,role}=action.payload;
            state.token=token;
            state.role=role;
            localStorage.setItem('token',token);
            localStorage.setItem('role',role);
        })
        .addCase(registerUser.fulfilled,(state,action)=>{

        })
    }
});

export const {logout} =authSlice.actions;
export default authSlice.reducer;