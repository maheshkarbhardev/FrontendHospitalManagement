import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState={
    items:[],
    status:"idle",
    error:null
};

export const fetchAdmissions=createAsyncThunk("admissions/fetchAdmissions",async()=>{
    const res=await axiosInstance.get('/admission/getAllAdmissions');
    // console.log("fetchAllAdmissions:- ",res.data);
    return res.data;
});

export const fetchAdmissionsById=createAsyncThunk("admissions/fetchAdmissionsById",async(id)=>{
    const res=await axiosInstance.get(`/admission/getAdmissionById/${id}`);
    // console.log("fetchAdmissionsById:- ",res.data);    
    return res.data;
});

export const createAdmissions=createAsyncThunk("admissions/createAdmission",async(formdata)=>{
    const res=await axiosInstance.post("/admission/createAdmission",formdata);
    // console.log("createAdmission:- ",res.data);
    return res.data;    
});

export const updateAdmission = createAsyncThunk("admissions/updateAdmission", async ({ id, formData }) => {
  const res = await axiosInstance.put(`/admission/updateAdmission/${id}`, formData);
  return res.data;
});

export const deleteAdmission=createAsyncThunk("admissions/deleteAdmission",async(id)=>{
    const res=await axiosInstance.delete(`/admission/deleteAdmission/${id}`);
    // console.log("deleteAdmission:- ",res.data.id);    
    return res.data.id;
});

const admissionSlice=createSlice({
    name:"admissions",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAdmissions.fulfilled,(state,action)=>{
            state.items=action.payload;
            state.status="Success"
        })
        .addCase(fetchAdmissionsById.fulfilled,(state,action)=>{
            state.status="Success"
        })
        .addCase(createAdmissions.fulfilled,(state,action)=>{
            state.items.push(action.payload);
            state.status="Success"
        })
        .addCase(updateAdmission.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.admission_id === action.payload.admission_id);
        if (index !== -1) {
        state.items[index] = action.payload;
         }
        state.status = "Success";
        })
        .addCase(deleteAdmission.fulfilled,(state,action)=>{
            state.items=state.items.filter((p)=> p.id !== action.payload);
            state.status="Success"
        })
    }
})

export default admissionSlice.reducer;
