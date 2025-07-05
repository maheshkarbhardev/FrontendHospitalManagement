import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";

const initialValue = {
  email: "",
  password: "",
};
const Login = () => {
  const [formData, setFormData] = useState(initialValue);
  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/patientList");
    } else {
      alert(
        "Login failed: " + (result.error?.message || "Invalid credentials")
      );
    }
  };
  return (
    <div className="flex justify-center items-center flex-col bg-center bg-cover">
      <div className="flex flex-col justify-center items-center font-bold text-[40px] mt-10 text-green-800">
        Login Form
      </div>

      <div className="flex flex-col gap-10px w-2/5 p-[40px] bg-slate-500 rounded-[15px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-7 items-center"
        >
          <input
            className="w-full px-[10px] py-[7px] rounded-[5px] border-[1px] border-[solid] border-[black] text-center"
            type="email"
            name="email"
            value={email || ""}
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            className="w-full px-[10px] py-[7px] rounded-[5px] border-[1px] border-[solid] border-[black] text-center"
            type="password"
            name="password"
            value={password || ""}
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-green-500 px-[20px] py-1.5 text-[20px] rounded-[5px] font-bold"
          >
            Login
          </button>

          <a href="/registration" className="text-white ">
            New User? SignUp Now !
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
