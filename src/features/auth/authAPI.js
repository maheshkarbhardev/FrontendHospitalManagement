import axiosInstance from "../../api/axiosInstance";

export const loginUserAPI = async (formData) => {
  const res = await axiosInstance.post("/auth/login", formData);
  console.log("Login Respone:- ", res.data);
  return res.data;
};

export const registerUserAPI = async (formData) => {
  const data = new FormData();

  data.append("firstName", formData.firstName);
  data.append("lastName", formData.lastName);
  data.append("email", formData.email);
  data.append("password", formData.password);
  data.append("confirmPassword", formData.confirmPassword);
  data.append("role", formData.role);
  data.append("image", formData.image); // the file

  const res = await axiosInstance.post("/auth/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("Register Response:- ", res.data);
  return res.data;
};

// export const registerUserAPI = async (formData) => {
//   const res = await axiosInstance.post("/auth/register", formData);
//   console.log("Register Respone:- ", res.data);
//   return res.data;
// };
