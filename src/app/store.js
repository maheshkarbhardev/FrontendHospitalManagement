import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import patientReducer from '../features/patient/patientSlice';
import doctorReducer from '../features/doctor/doctorSlice';
import admissionReducer from '../features/admission/admissionSlice';

export const store=configureStore({
    reducer:{
        auth:authReducer,
        patient:patientReducer,
        doctor:doctorReducer,
        admission:admissionReducer
    }
})