import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const PatientList = () => {
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
          <table className="w-[80%] text-center">
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
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
