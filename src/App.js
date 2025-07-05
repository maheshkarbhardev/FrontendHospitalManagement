import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PatientList from './pages/PatientList';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/patientList' element={<PatientList/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
