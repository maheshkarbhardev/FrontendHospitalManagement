import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-[#333] text-white p-4 sticky top-[0]">
        <div className="flex flex-row justify-between items-center">
          <div className="text-xl font-bold mb-2 ml-5">
            <Link to="/patientList">Hospital Management</Link>
          </div>
          <ul className="flex space-x-7 items-center mr-[155px]">
            <li>
              <Link to="/patientList">Patient</Link>
            </li>
            <li>
              <Link to="/doctorList">Doctor</Link>
            </li>
            <li>
              <Link to="/admissionList">Admission</Link>
            </li>
            <li>
              <Link to="/appointmentList">Appointments</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
