import './App.css';
import Sidebar from './Components/Dashboard/SideMenu';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Switch,BrowserRouter,Route, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from './Components/Attendance/Tab';
import Login from './Components/Login/Login';
import Logout from './Components/Login/Logout';
import Forgotpassword from './Components/Login/Forgotpassword';
import Profile from './Components/Profile/Profile';
import M1Batch from './Components/Batch/M1Batch';
import M2Batch from './Components/Batch/M2Batch';
import E1Batch from './Components/Batch/E1Batch';
import E2Batch from './Components/Batch/E2Batch';
import Marks from './Components/Marks/Marks';
import Staff from './Components/Staff/Staff';
import Subject from './Components/Subject/Subject';
import TimeTable from './Components/TimeTable/TimeTable.tsx';
import PrintComponent from './Components/TimeTable/Print';
import Tabtt from './Components/TimeTable/Tabtt';

function App() {
  return (
   
      <div className="App">
         
        <BrowserRouter>

        <Routes>
          <Route exact path="/attendance" element={<Tab/>}/>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/logout" element={Logout}/>
          <Route exact path="/forgotpassword" element={<Forgotpassword/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/M1Batch" element={<M1Batch/>}/>
          <Route exact path="/M2Batch" element={<M2Batch/>}/>
          <Route exact path="/E1Batch" element={<E1Batch/>}/>
          <Route exact path="/E2Batch" element={<E2Batch/>}/>
          {/* <Route exact path="/marks" element={<Marks/>}/> */}
          <Route exact path="/staff" element={<Staff/>}/>
          <Route exact path="/subject" element={<Subject/>}/>
          <Route exact path="/timetable" element={<Tabtt/>}/>
          <Route exact path="/print" element={<PrintComponent/>}/>
          

          

        
        
       </Routes>
         
      </BrowserRouter>
      </div>
   
  );
}

export default App;