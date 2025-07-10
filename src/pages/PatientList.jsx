import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePatient, fetchPatients } from "../features/patient/patientSlice";

const PatientList = () => {
  const dispatch = useDispatch();

  const patients = useSelector((state) => state.patient.items);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      console.log("Deleting patient with ID:", id);
      dispatch(deletePatient(id));
      dispatch(fetchPatients());
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className="flex flex-row justify-center items-center mb-[25px]">
          <Link to="/createPatient">
            <button className="bg-yellow-400 px-[20px] py-[10px] mt-[15px] rounded-[5px] ">
              Add Patient
            </button>
          </Link>
        </div>
        <div className="flex flex-row justify-center items-center">
          <p className="font-bold text-[32px]">Patient List</p>
        </div>

        <div className="flex flex-row justify-center">
          <table className="w-[100%] text-center">
            <thead>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Birth Date</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Disease</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Actions</th>
            </thead>

            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan="15" className="py-3">
                    No patients found.
                  </td>
                </tr>
              ) : (
                patients.map((patient, index) => (
                  <tr key={patient.patient_id}>
                    <td className="border px-2 py-1">{index + 1}</td>
                    <td className="border px-2 py-1">{patient.firstName}</td>
                    <td className="border px-2 py-1">{patient.lastName}</td>
                    <td className="border px-2 py-1">{patient.mobile}</td>
                    <td className="border px-2 py-1">{patient.email}</td>
                    <td className="border px-2 py-1">{patient.gender}</td>
                    <td className="border px-2 py-1">{patient.birthDate}</td>
                    <td className="border px-2 py-1">{patient.address}</td>
                    <td className="border px-2 py-1">{patient.city}</td>
                    <td className="border px-2 py-1">{patient.state}</td>
                    <td className="border px-2 py-1">{patient.country}</td>
                    <td className="border px-2 py-1">{patient.disease}</td>
                    <td className="border px-2 py-1">{patient.height}</td>
                    <td className="border px-2 py-1">{patient.weight}</td>
                    <td className="border px-2 py-1">
                      <Link
                        to={`/updatePatient/${patient.patient_id}`}
                        className="text-blue-500 mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(patient.patient_id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
