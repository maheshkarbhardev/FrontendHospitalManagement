import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { deleteDoctor, fetchDoctors } from "../features/doctor/doctorSlice";
import { useDispatch, useSelector } from "react-redux";

const DoctorList = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor.items);
  // console.log("doctors:- ", doctors);

  const handleDelete = (id) => {
    if (window.confirm("Do You want to delete this doctor?")) {
      // console.log("Deleting doctors id:- ", id);
      dispatch(deleteDoctor(id)).then(() => {
        dispatch(fetchDoctors());
      });
    }
  };

  useEffect(() => {
    dispatch(fetchDoctors());
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-row justify-center mt-4">
        <h1 className="text-[45px]">Doctor List</h1>
      </div>

      <div className="flex flex-row justify-center">
        <Link to="/createDoctor">
          <button className="bg-green-400 px-5 py-3">Add Doctor</button>
        </Link>
      </div>

      <div className="flex flex-row justify-center">
        <table className="w-[100%] text-center">
          <thead>
            <th>Id</th>
            <th>Dr. FirstName</th>
            <th>Dr. LastName</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Speciality</th>
            <th>Actions</th>
          </thead>

          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-3">
                  No Doctors Found
                </td>
              </tr>
            ) : (
              doctors.map((doctor, index) => (
                <tr key={doctor.doctor_id}>
                  <td>{index + 1}</td>
                  <td>{doctor.dr_first_name}</td>
                  <td>{doctor.dr_last_name}</td>
                  <td>{doctor.dr_mobile}</td>
                  <td>{doctor.dr_email}</td>
                  <td>{doctor.dr_specialty}</td>
                  <td>
                    <Link to={`/updateDoctor/${doctor.doctor_id}`}>
                    <button>Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(doctor.doctor_id)}>
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
  );
};

export default DoctorList;
