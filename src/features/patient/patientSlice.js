import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState={
    items:[],
    status:"idle",
    error:null
}

export const fetchPatients=createAsyncThunk("patients/fetchPatients",async()=>{
    const res=await axiosInstance.get('/patient/getAllPatients');
    // console.log("Fetch Patients:- ",res.data);
    return res.data;
});

export const fetchPatientById = createAsyncThunk("patients/fetchPatientById",async (id) => {
    const res = await axiosInstance.get(`/patient/getPatientById/${id}`);
    console.log("Fetch Patient By ID:", res.data);
    return res.data;
  }
);

export const createPatient=createAsyncThunk("patients/createPatient",async(formData)=>{
    const res=await axiosInstance.post("/patient/createPatient",formData);
    // console.log("New Patient Response:", res.data);
    return res.data;
});

export const updatePatient=createAsyncThunk("patients/updatePatient",async({id,formData})=>{
    console.log("updatePatient id:- ",id);
     console.log("updatePatient formData:- ",formData);
    
    const res=await axiosInstance.put(`/patient/updatePatient/${id}`,formData);
     console.log("updatePatient after api call:- ",res.data);
    return res.data;
});

export const deletePatient = createAsyncThunk("patients/deletePatient", async (id) => {
  const res = await axiosInstance.delete(`/patient/deletePatient/${id}`);
  console.log("delete patient",res.data.id);  
  return res.data.id; // use returned id from backend
});

const patientSlice=createSlice({
    name:"patients",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchPatients.fulfilled,(state,action)=>{
            state.items=action.payload;
        })
        .addCase(createPatient.fulfilled,(state,action)=>{
            // console.log("extraReducers createPatient:- ",action.payload);
            
            state.items.push(action.payload);
        })
        .addCase(updatePatient.fulfilled,(state,action)=>{
            const index = state.items.findIndex((p) => p.patient_id === action.payload.patient_id);
            if (index !== -1) 
                {
                state.items[index] = action.payload;
                }
        })
        .addCase(deletePatient.fulfilled, (state, action) => {
            console.log("deletePatient extraReducers:-",action.payload);
            
        state.items = state.items.filter((p) => Number(p.id) !== Number(action.payload));
        });
    }
})

export default patientSlice.reducer;