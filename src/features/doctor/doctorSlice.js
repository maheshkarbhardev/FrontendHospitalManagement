import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState={
    items:[],
    selectedDoctor: null,
    status:"idle",
    error:null
}

export const fetchDoctors=createAsyncThunk("doctors/fetchDoctors",async()=>{
    const res=await axiosInstance.get("/doctor/getAllDoctors");
    console.log("FetchAllDoctors:- ",res.data);
    return res.data;    
});

export const fetchDoctorById=createAsyncThunk("doctors/fetchDoctorById",async(id)=>{
    const res=await axiosInstance.get(`/doctor/getDoctorById/${id}`);
    console.log("fetchDoctorById after api call:- ", res.data);
    return res.data;
});

export const createDoctor=createAsyncThunk("doctors/createDoctor",async(formData)=>{
    const res=await axiosInstance.post("/doctor/createDoctor",formData);
    console.log("createDoctor:- ",res.data);    
    return res.data;
});

export const updateDoctor=createAsyncThunk("doctors/updateDoctor",async({id,formData})=>{
     console.log("updateDoctor id:- ",id);
     console.log("updateDoctor formData:- ",formData);

    const res=await axiosInstance.put(`/doctor/updateDoctor/${id}`,formData);
    console.log("updateDoctor after api call:-:- ",res.data);
    return res.data;    
});

export const deleteDoctor=createAsyncThunk("doctors/deleteDoctor",async(id)=>{
    console.log("DeleteDoctorId:- ",id);
    
    const res=await axiosInstance.delete(`/doctor/deleteDoctor/${id}`);
    console.log("delete doctor after api call",res.data.id);  
    return res.data.id;
});

const doctorSlice=createSlice({
    name:"doctors",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchDoctors.fulfilled,(state,action)=>{
            // console.log("extraReducers fetchDoctors:- ",action.payload);
            state.items=action.payload;
        })
        .addCase(fetchDoctorById.fulfilled, (state, action) => {
            state.selectedDoctor = action.payload;
        })  
        .addCase(createDoctor.fulfilled,(state,action)=>{
            console.log("extraReducers createDoctor:- ",action.payload);            
            state.items.push(action.payload);
            state.status="Success"
        })
        .addCase(updateDoctor.fulfilled,(state,action)=>{
            const index=state.items.findIndex((p)=> p.id === action.payload.id);
            console.log("extraReducers updateDoctor index:- ",index);
            console.log("extraReducers updateDoctor ",action.payload);
                        
            state.items[index]=action.payload;
        })
        .addCase(deleteDoctor.fulfilled,(state,action)=>{
            state.items=state.items.filter((p)=> p.id !== action.payload)
        })
    }
})

export default doctorSlice.reducer;