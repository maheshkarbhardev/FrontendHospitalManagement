import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPatients } from "../features/patient/patientSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchDoctors } from "../features/doctor/doctorSlice";
import { createAdmissions, fetchAdmissions, fetchAdmissionsById, updateAdmission } from "../features/admission/admissionSlice";


const initialValues = {
  patient_id: "",
  admission_date: "",
  discharge_date: "-",
  diagnosis: "",
  attending_doctor_id: "",
};
const CreateAdmission = () => {
  const [formData, setFormData] = useState(initialValues);
  const {
    patient_id,
    admission_date,
    discharge_date,
    diagnosis,
    attending_doctor_id,
  } = formData;
  const dispatch = useDispatch();
  const {id}=useParams();
  const navigate=useNavigate();
  const patients = useSelector((state) => state.patient.items);
  const doctors = useSelector((state) => state.doctor.items);
  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchDoctors());
  }, [dispatch]);

  // useEffect(() => {
  //   if (patients.length === 0) {
  //     dispatch(fetchPatients());
  //   }
  //   if (doctors.length === 0) {
  //     dispatch(fetchDoctors());
  //   }
  // }, [dispatch, patients.length, doctors.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(()=>{
    if(id){
        dispatch(fetchAdmissionsById(id)).then((resp)=>{
            if(resp.payload){
                setFormData(resp.payload)
            }
        })
    }
  },[id,dispatch])

  const handleSubmit=(e)=>{
    e.preventDefault();

    if(!patient_id || !admission_date || !diagnosis || !attending_doctor_id){
        alert("Please Fill All Details.")
    }
    else{
        if(!id){
            dispatch(createAdmissions(formData))
            .then(()=>{
            setFormData({
                patient_id: "",
                admission_date: "",
                discharge_date: "-",
                diagnosis: "",
                attending_doctor_id: "",
            })
            })
            .catch((err)=>{
                alert(err.response.data)
            });
            alert("Admission Details Filled Successfully.")
        }
        else{
            dispatch(updateAdmission({ id, formData }))
            .then(()=>{
              dispatch(fetchAdmissions());
                setFormData({
                    patient_id: "",
                    admission_date: "",
                    discharge_date: "-",
                    diagnosis: "",
                    attending_doctor_id: "",
                })
            })
            .catch((err)=>{
                alert(err.response.data)
            });
            alert("Admission Details Updated Successfully.")
        }

        setTimeout(()=>{
            navigate("/admissionList")
        },300)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col">
        <div className="flex flex-row justify-center bg-green-300">
          <h1 className="text-[35px] font-bold py-3">Admission Form</h1>
        </div>
        <div className="flex flex-row justify-center mt-11 ">
          <form onSubmit={handleSubmit}>
            <label htmlFor="patient_id">Patient Name:- </label>
            <select
              name="patient_id"
              value={patient_id}
              id="patient_id"
              onChange={handleChange}
            >
              <option value="" className="text-center">
                -- Select Patient --
              </option>
              {patients.map((patient) => (
                <option
                  key={patient.patient_id}
                  value={patient.patient_id}
                  className="text-center"
                >
                  {patient.firstName}
                </option>
              ))}
            </select>
            <br />
            <br />

            <label htmlFor="admission_date">Admission Date: </label>
            <input
              type="date"
              id="admission_date"
              name="admission_date"
              value={admission_date || ""}
              onChange={handleChange}
            />
            <br />
            <br />

            <label htmlFor="discharge_date">Discharge Date: </label>
            <input
              type="date"
              id="discharge_date"
              name="discharge_date"
              value={discharge_date || "-"}
              onChange={handleChange}
            />
            <br />
            <br />

            <label htmlFor="diagnosis">Diagnosis: </label>
            <input
              className="text-center"
              type="text"
              id="diagnosis"
              name="diagnosis"
              value={diagnosis || ""}
              onChange={handleChange}
              placeholder="Enter Diagnosis"
            />
            <br />
            <br />

            <label htmlFor="attending_doctor_id">
              Attending Doctor Name:-{" "}
            </label>
            <select
              name="attending_doctor_id"
              id="attending_doctor_id"
              value={attending_doctor_id}
              onChange={handleChange}
            >
              <option value="">--Attending Doctor Name --</option>
              {doctors.map((doctor) => (
                <option key={doctor.doctor_id} value={doctor.doctor_id}>
                  {doctor.dr_first_name}
                </option>
              ))}
            </select>
            <br />
            <br />

            <div className="flex flex-row justify-center">
            <button type="submit" className="bg-green-400 text-black py-1 px-7 mr-3 rounded-[5px]">Save</button>
            <Link to="/admissionList">
              <button className="bg-red-300 py-1 px-7 text-black rounded-[5px]">Cancel</button>
            </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmission;
