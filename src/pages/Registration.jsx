import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";


const initialValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "patient",
  image: null,
};
const Registration = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [formData, setFormData] = useState(initialValue);

  const [passwordMatch, setPasswordMatch] = useState(true);

  const { firstName, lastName, email, password, confirmPassword, role, image } =
    formData;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const result=await dispatch(registerUser(formData));
    if(result.meta.requestStatus === 'fulfilled'){
      alert("Registration Successfull.");
      navigate("/")
    }
  }

  useEffect(() => {
    setPasswordMatch(password === confirmPassword || confirmPassword === "");
  }, [password, confirmPassword]);
  return (
    <div className="w-[100vw]  flex justify-center items-center flex-col bg-center bg-cover">
      <div className="flex justify-center items-center font-bold text-red-600 text-[40px]">
        Registration Form
      </div>

      <div className="flex flex-col gap-[15px] w-2/5 p-[40px] bg-gray-500 rounded-[20px]">
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[15px]">
          <input 
            className="w-full px-[15px] py-[7px]  border-none border-b-[1px_solid_rgba(255,_255,_255,_0.3)] outline-[none] text-center text-black rounded-xl"
            type="text"
            name="firstName"
            value={firstName || ""}
            placeholder="First Name"
            onChange={handleChange}
          />

          <input
            className="w-full px-[15px] py-[7px]  border-none border-b-[1px_solid_rgba(255,_255,_255,_0.3)] outline-[none] text-center text-black rounded-xl"
            type="text"
            name="lastName"
            value={lastName || ""}
            placeholder="Last Name"
            onChange={handleChange}
          />

          <input
            className="w-full px-[15px] py-[7px]  border-none border-b-[1px_solid_rgba(255,_255,_255,_0.3)] outline-[none] text-center text-black rounded-xl"
            type="email"
            name="email"
            value={email || ""}
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            className="w-full px-[15px] py-[7px]  border-none border-b-[1px_solid_rgba(255,_255,_255,_0.3)] outline-[none] text-center text-black rounded-xl"
            type="password"
            name="password"
            value={password || ""}
            placeholder="Password"
            onChange={handleChange}
          />

          <input
            className="w-full px-[15px] py-[7px]  border-none border-b-[1px_solid_rgba(255,_255,_255,_0.3)] outline-[none] text-center text-black rounded-xl"
            type="password"
            name="confirmPassword"
            value={confirmPassword || ""}
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          {!passwordMatch && (
            <p className="text-red-600">Passwords Are Not Matching</p>
          )}

          <select
            className="w-full px-[15px] py-[7px]  border-none border-b-[1px_solid_rgba(255,_255,_255,_0.3)] outline-[none] text-center text-black rounded-xl"
            name="role"
            value={role || 'patient'}
            onChange={handleChange}
          >
            <option value="patient">Patient</option>
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>            
          </select>

          <input
            className=""
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />

          {image && (
            <img
              className="max-w-[180px]"
              src={URL.createObjectURL(image)}
              alt="Profile Preview"
            />
          )}

          <button type="submit" className="bg-white text-[22px] p-3 py-2 w-[60%] cursor-pointer font-bold rounded-md">
            Register
          </button>

          <a className="text-white" href="/">Already Have an Account?</a>
        </form>
      </div>
    </div>
  );
};

export default Registration;
