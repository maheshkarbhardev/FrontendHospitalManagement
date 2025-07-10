import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createDoctor,
  fetchDoctorById,
  updateDoctor,
} from "../features/doctor/doctorSlice";

const initialValues = {
  dr_first_name: "",
  dr_last_name: "",
  dr_mobile: "",
  dr_email: "",
  dr_specialty: "",
};

const CreateDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialValues);
  const { id } = useParams();
  const { dr_first_name, dr_last_name, dr_mobile, dr_email, dr_specialty } =
    formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchDoctorById(id)).then((resp) => {
        if (resp.payload) {
          setFormData(resp.payload); // Make sure payload is the doctor object
        }
      });
    }
  }, [id, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !dr_first_name ||
      !dr_last_name ||
      !dr_mobile ||
      !dr_email ||
      !dr_specialty
    ) {
      alert("Please Fill All Fields");
    } else {
      if (!id) {
        dispatch(createDoctor(formData))
          .then(() => {
            setFormData({
              dr_first_name: "",
              dr_last_name: "",
              dr_mobile: "",
              dr_email: "",
              dr_specialty: "",
            });
          })
          .catch((err) => {
            alert(err.response.data);
          });

        alert("Doctor Added Successfully.");
      } else {
        dispatch(updateDoctor({ id, formData }))
          .then(() => {
            setFormData({
              dr_first_name: "",
              dr_last_name: "",
              dr_mobile: "",
              dr_email: "",
              dr_specialty: "",
            });
          })
          .catch((err) => {
            alert(err.response.data);
          });
        alert("Doctor Updated Successfully.");
      }

      setTimeout(() => {
        navigate("/doctorList");
      }, 300);
    }
  };
  return (
    <div>
      <div className="flex flex-row justify-center mt-7 ">
        <h1 className="text-[35px]">Add Doctor</h1>
      </div>

      <div className="flex flex-row justify-center ">
        <form onSubmit={handleSubmit}>
          <label htmlFor="dr_first_name">Dr. First Name:- </label>
          <input
            type="text"
            id="dr_first_name"
            name="dr_first_name"
            value={dr_first_name || ""}
            placeholder="Enter FirstName"
            onChange={handleChange}
          />
          <br />
          <br />

          <label htmlFor="dr_last_name">Dr. Last Name:- </label>
          <input
            type="text"
            id="dr_last_name"
            name="dr_last_name"
            value={dr_last_name || ""}
            placeholder="Enter Last Name"
            onChange={handleChange}
          />
          <br />
          <br />

          <label htmlFor="dr_mobile">Dr. MobileNo.:- </label>
          <input
            type="text"
            id="dr_mobile"
            name="dr_mobile"
            value={dr_mobile || ""}
            placeholder="Enter Mobile No."
            onChange={handleChange}
          />
          <br />
          <br />

          <label htmlFor="dr_email">Dr. Email:- </label>
          <input
            type="email"
            id="dr_email"
            name="dr_email"
            value={dr_email || ""}
            placeholder="Enter Email"
            onChange={handleChange}
          />
          <br />
          <br />

          <label htmlFor="dr_specialty">Dr. Speciality:- </label>
          <input
            type="text"
            id="dr_specialty"
            name="dr_specialty"
            value={dr_specialty || ""}
            placeholder="Enter Speciality"
            onChange={handleChange}
          />
          <br />
          <br />

          <div className="flex flex-row gap-5">
            <button
              type="submit"
              className="py-2 px-6 bg-green-500 rounded-[10px]"
            >
              Submit
            </button>
            <Link to="/doctorList">
              <button className="py-2 px-6 bg-red-400 rounded-[10px]">
                Go Back
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDoctor;
