import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PatientList from "./pages/PatientList";
import DoctorList from "./pages/DoctorList";
import AdmissionList from "./pages/AdmissionList";
import AppointmentList from "./pages/AppointmentList";
import CreatePatient from "./pages/CreatePatient";
import PrivateRoute from "./routes/PrivateRoutes";
import RoleBasedRoute from "./routes/RoleBasedToken";
import CreateDoctor from "./pages/CreateDoctor";
import CreateAdmission from "./pages/CreateAdmission";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/patientList"
            element={
              <PrivateRoute>
                <PatientList />
              </PrivateRoute>
            }
          />
          <Route
            path="/createPatient"
            element={
              <PrivateRoute>
                <CreatePatient />
              </PrivateRoute>
            }
          />

          <Route
            path="/updatePatient/:id"
            element={
              <PrivateRoute>
                <CreatePatient />
              </PrivateRoute>
            }
          />


          <Route
            path="/doctorList"
            element={
              <PrivateRoute>
                <RoleBasedRoute allowedRules={["admin", "doctor"]}>
                  <DoctorList />
                </RoleBasedRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/createDoctor"
            element={
              <PrivateRoute>
                <RoleBasedRoute allowedRules={["admin", "doctor"]}>
                  <CreateDoctor/>
                </RoleBasedRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/updateDoctor/:id"
            element={
              <PrivateRoute>
                <RoleBasedRoute allowedRules={["admin", "doctor"]}>
                  <CreateDoctor/>
                </RoleBasedRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/admissionList"
            element={
              <PrivateRoute>
                <RoleBasedRoute allowedRules={["admin", "doctor"]}>
                  <AdmissionList />
                </RoleBasedRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/createAdmission"
            element={
              <PrivateRoute>
                <RoleBasedRoute allowedRules={["admin", "doctor"]}>
                  <CreateAdmission/>
                </RoleBasedRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/updateAdmission/:id"
            element={
              <PrivateRoute>
                <RoleBasedRoute allowedRules={["admin", "doctor"]}>
                  <CreateAdmission/>
                </RoleBasedRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/appointmentList"
            element={
              <PrivateRoute>
                <RoleBasedRoute allowedRules={["admin", "doctor"]}>
                  <AppointmentList />
                </RoleBasedRoute>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
