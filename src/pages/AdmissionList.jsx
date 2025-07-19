import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteAdmission, fetchAdmissions } from "../features/admission/admissionSlice";
import { fetchPatients } from "../features/patient/patientSlice";
import { fetchDoctors } from "../features/doctor/doctorSlice";

const AdmissionList = () => {
  const dispatch = useDispatch();

  const admissions = useSelector((state) => state.admission.items);
  const patients=useSelector((state)=> state.patient.items);
  const doctors=useSelector((state)=> state.doctor.items);

  // console.log("Admissions:- ", admissions);

  const getPatientName = (id) => {
  const patient = patients.find((e) => e.patient_id === id); // ✅ use patient_id
  return patient?.firstName || "Unknown";
};

const getDoctorName=(id)=>{
  const doctor=doctors.find((e)=> e.doctor_id === id);
  return doctor?.dr_first_name || "Unknown";
}

const handleDelete=(id)=>{
  if(window.confirm("Do You Want To Delete This Admission?")){
    dispatch(deleteAdmission(id)).then(()=>{
      dispatch(fetchAdmissions());
    })
  }
}

   
  useEffect(() => {
    dispatch(fetchAdmissions());
    dispatch(fetchPatients());
    dispatch(fetchDoctors())
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col">
        <div className="flex flex-row justify-center bg-green-300">
          <h1 className="text-[35px] font-bold text-red-400 ">
            Admission List
          </h1>
        </div>

        <div className="flex flex-row justify-center mt-5 mb-5">
          <Link to="/createAdmission">
            <button className="bg-black text-white font-bold py-3 px-3 rounded-[5px]">
              Add Admission
            </button>
          </Link>
        </div>
        <div>
          <table className="w-[100%]">
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Patient Name</th>
                <th>Admission Date</th>
                <th>discharge Date</th>
                <th>Diagnosis</th>
                <th>Attending Doctor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admissions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-3">
                    No Admission Found
                  </td>
                </tr>
              ) : (
                admissions.map((admission, index) => {
                  let formattedAdmissionDate=new Date(admission.admission_date).toISOString().split("T")[0];

                  let formattedDischargeDate=new Date(admission.discharge_date).toISOString().split("T")[0];

                  return (
                    <tr className="text-center" key={admission.admission_id}>
                      <td>{index + 1}</td>
                      <td>{getPatientName(admission.patient_id)}</td>
                      <td>{formattedAdmissionDate}</td>
                      <td>{formattedDischargeDate}</td>
                      <td>{admission.diagnosis}</td>
                      <td>{getDoctorName(admission.attending_doctor_id)}</td>
                      <td>
                        <Link to={`/updateAdmission/${admission.admission_id}`}>
                        <button>Edit</button>
                        </Link>
                        <button onClick={()=> handleDelete(admission.admission_id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdmissionList;
