import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PatientList from './pages/PatientList';
import DoctorList from './pages/DoctorList';
import AdmissionList from './pages/AdmissionList';
import AppointmentList from './pages/AppointmentList';
import CreatePatient from './pages/CreatePatient';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/patientList' element={<PatientList/>}/>
        <Route path='/createPatient' element={<CreatePatient/>}/>
        <Route path='/doctorList' element={<DoctorList/>}/>
        <Route path='/admissionList' element={<AdmissionList/>}/>
        <Route path='/appointmentList' element={<AppointmentList/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
