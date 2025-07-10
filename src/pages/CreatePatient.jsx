import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPatient, fetchPatients, updatePatient } from "../features/patient/patientSlice";

const initialValue = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  gender: "male",
  birthDate: "",
  address: "",
  city: "",
  state: "",
  country: "",
  disease: "",
  height: 0,
  weight: 0,
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required."),
  lastName: Yup.string().required("Last Name is required."),
  mobile: Yup.string().required("Mobile Number is required."),
  email: Yup.string().email("Invalid Email").required("Email is required."),
  gender: Yup.string().required("Gender is required."),
  birthDate: Yup.string().required("Birth Date is required."),
  address: Yup.string().required("Address is required."),
  city: Yup.string().required("City is required."),
  state: Yup.string().required("State is required."),
  country: Yup.string().required("Country is required."),
  disease: Yup.string().required("Disease is required."),
  height: Yup.number()
    .required("Height is required.")
    .typeError("Height must be number")
    .positive("Height must be positive."),
  weight: Yup.number()
    .required("Weight is required")
    .typeError("Weight must be number")
    .positive("Weight must be positive."),
});

const CreatePatient = () => {
  

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patient?.items || []);
   const [initialFormValues, setInitialFormValues] = useState(initialValue);



  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

 useEffect(() => {
    if (id && patients.length > 0) {
      const existing = patients.find((p) => p.id === id || p._id === id);
      console.log("Existing Value ",existing);
      
      if (existing) {
        setInitialFormValues({
          firstName: existing.firstName || "",
          lastName: existing.lastName || "",
          mobile: existing.mobile || "",
          email: existing.email || "",
          gender: existing.gender || "male",
          birthDate: existing.birthDate || "",
          address: existing.address || "",
          city: existing.city || "",
          state: existing.state || "",
          country: existing.country || "",
          disease: existing.disease || "",
          height: existing.height || 0,
          weight: existing.weight || 0,
        });
      }
    } else {
      setInitialFormValues(initialValue); // reset to blank if adding
    }
  }, [id, patients]);

  const handleSubmit = (values, { resetForm }) => {
    if (!id) {
      dispatch(createPatient(values)).then(() => {
        alert("Patient Added Successfully.");
        resetForm();
        navigate("/patientList");
      });
    } else {
      console.log("Values:- ",values);
      
      dispatch(updatePatient({ id, formData: values })).then(() => {
        alert("Patient Updated Successfully.");
        resetForm();
        navigate("/patientList");
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-row justify-center items-center">
        <h1 className="text-[40px] font-bold text-purple-950">Patient Form</h1>
      </div>

      <div className="flex flex-row justify-center mt-[20px]">
        <Formik
          initialValues={initialFormValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="border-[2px] border-[solid] border-[black] py-[20px] px-[30px] rounded-[10px] bg-[lightblue]">
              <label htmlFor="firstName" className="text-[20px]">
                Firstname:-{" "}
              </label>
              <Field
                className="px-[10px] py-[5px] text-center w-[270px] border-[2px] border-[solid] border-[black] mb-6"
                type="text"
                id="firstName"
                name="firstName"
                // value={firstName || ""}
                placeholder="Enter FirstName"
                // onChange={handleChange}
              />
              <ErrorMessage
                className="text-red-500"
                name="firstName"
                component="div"
              />
              <br />

              <label htmlFor="lastName" className="text-[20px]">
                LastName:-{" "}
              </label>
              <Field
                className="px-[10px] py-[5px] text-center w-[270px] border-[2px] border-[solid] border-[black] mb-6"
                type="text"
                id="lastName"
                name="lastName"
                // value={lastName || ""}
                placeholder="Enter LastName"
                // onChange={handleChange}
              />
              <ErrorMessage
                className="text-red-500"
                name="lastName"
                component="div"
              />
              <br />

              <label htmlFor="mobile" className="text-[20px]">
                Mobile:-{" "}
              </label>
              <Field
                className="px-[10px] py-[5px] text-center w-[270px] border-[2px] border-[solid] border-[black] mb-6 ml-7"
                type="text"
                id="mobile"
                name="mobile"
                // value={mobile || ""}
                placeholder="Enter Mobile Number"
                // onChange={handleChange}
              />
              <ErrorMessage
                className="text-red-500"
                name="mobile"
                component="div"
              />
              <br />

              <label htmlFor="email" className="text-[20px]">
                Email:-{" "}
              </label>
              <Field
                className="px-[10px] py-[5px] text-center w-[270px] border-[2px] border-[solid] border-[black] mb-6 ml-10"
                type="email"
                id="email"
                name="email"
                // value={email || ""}
                placeholder="Enter Email"
                // onChange={handleChange}
              />
              <ErrorMessage
                className="text-red-500"
                name="email"
                component="div"
              />
              <br />

              <label htmlFor="gender" className="text-[20px] ">
                Gender:-{" "}
              </label>
              <Field className="ml-5" type="radio" name="gender" value="male" />
              <span className="text-[20px] ml-2">Male</span>

              <Field
                className="ml-5 mb-6"
                type="radio"
                name="gender"
                value="female"
              />
              <span className="text-[20px] ml-2">Female</span>

              <ErrorMessage name="gender" component="div" />
              <br />

              <label htmlFor="birthDate" className="text-[20px]">
                Birthdate:-{" "}
              </label>
              <Field
                className="px-[10px] py-[5px] text-center w-[270px] border-[2px] border-[solid] border-[black] mb-6 ml-2"
                type="date"
                id="birthDate"
                name="birthDate"
                // value={birthDate || ""}
                // onChange={handleChange}
              />
              <ErrorMessage
                className="text-red-500"
                name="birthDate"
                component="div"
              />
              <br />

              <label htmlFor="address" className="text-[20px]">
                Address:-{" "}
              </label>
              <Field
                className="px-[10px] py-[5px] text-center w-[270px] border-[2px] border-[solid] border-[black] mb-6 ml-4"
                type="text"
                id="address"
                name="address"
                // value={address || ""}
                placeholder="Enter Home Address"
                // onChange={handleChange}
              />
              <ErrorMessage
                className="text-red-500"
                name="address"
                component="div"
              />
              <br />

              <label htmlFor="city" className="text-[20px]">
                City:-{" "}
              </label>
              <Field
                className="px-[10px] py-[5px] text-center w-[270px] border-[2px] border-[solid] border-[black] mb-6 ml-14"
                type="text"
                id="city"
                name="city"
                // value={city || ""}
                placeholder="Enter City"
                // onChange={handleChange}
              />
              <ErrorMessage
                className="text-red-500"
                name="city"
                component="div"
              />
              <br />

              <label htmlFor="state" className="text-[20px]">
                State:-{" "}
              </label>
              <Field
                className="px-[10px] py-[5px] text-center w-[270px] border-[2px] border-[solid] border-[black] mb-6 ml-11"
                type="text"
                id="state"
                name="state"
                // value={state || ""}
                placeholder="Enter State"
                // onChange={handleChange}
              />
              <ErrorMessage
                className="text-red-500"
                name="state"
                component="div"
              />
              <br />

              <label htmlFor="country" className="text-[20px]">
                Country:-{" "}
              </label>
              <Field
                className="px-[10px] py-[5px] text-center w-[270px] border-[2px] border-[solid] border-[black] mb-6 ml-4"
                type="text"
                id="country"
                name="country"
                // value={country || ""}
                placeholder="Enter Country"
                // onChange={handleChange}
              />
              <ErrorMessage
                className="text-red-500"
                name="country"
                component="div"
              />
              <br />

              <label htmlFor="disease" className="text-[20px]">
                Disease:-{" "}
              </label>
              <Field
                className="px-[10px] py-[5px] text-center w-[270px] border-[2px] border-[solid] border-[black] mb-6 ml-4"
                type="text"
                id="disease"
                name="disease"
                // value={disease || ""}
                placeholder="Enter Disease"
                // onChange={handleChange}
              />
              <ErrorMessage
                className="text-red-500"
                name="disease"
                component="div"
              />
              <br />

              <label htmlFor="height" className="text-[20px]">
                Height:-{" "}
              </label>
              <Field
                className="px-[10px] py-[5px] text-center w-[270px] border-[2px] border-[solid] border-[black] mb-6 ml-7"
                type="number"
                id="height"
                name="height"
                // value={height || ""}
                placeholder="Enter Height"
                // onChange={handleChange}
              />
              <ErrorMessage
                className="text-red-500"
                name="height"
                component="div"
              />
              <br />

              <label htmlFor="weight" className="text-[20px]">
                Weight:-{" "}
              </label>
              <Field
                className="px-[10px] py-[5px] text-center w-[270px] border-[2px] border-[solid] border-[black] mb-6 ml-4"
                type="number"
                id="weight"
                name="weight"
                // value={weight || ""}
                placeholder="Enter Weight"
                // onChange={handleChange}
              />
              <ErrorMessage
                className="text-red-500"
                name="weight"
                component="div"
              />
              <br />

              <div className="flex gap-5 justify-center">
                <button
                  className="bg-green-500 text-[18px] px-5 py-2 border-[1px] border-[solid] border-[black] rounded-[5px]"
                  type="submit"
                >
                  Submit
                </button>

                <Link to="/patientList">
                  <button className="bg-red-400 text-[18px] px-5 py-2 border-[1px] border-[solid] border-[black] rounded-[5px]">
                    Cancel
                  </button>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreatePatient;
