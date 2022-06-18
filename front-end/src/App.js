import { Route, Routes } from 'react-router-dom';

import AdminLogin from './modules/admin/adminLogin';
import AdminDashboard from './modules/admin/components/adminDashboard';
import Home from './modules/home.component';
import Login from './modules/login.component';
import StudentDashboard from './modules/students/components/student.dashboard';
import './App.css';
import HostelOwnerDashboard from './modules/hostelOwner/hostelOwnerDashboard';
import SignUp from './modules/signUp.component';


function App() {

  return (
    <div className="App">    
      <Routes>
          <Route path='/admin/login' element={<AdminLogin/>}/>
          <Route path='/admin/dashboard' element={<AdminDashboard/>}/>

          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signUp' element={<SignUp/>}/>

          <Route exact path='/student/dashboard' element={<StudentDashboard/>}/> 

          <Route exact path='/hostelOwner/dashboard' element={<HostelOwnerDashboard/>}/>  
          
          <Route exact path='/' element={<Home/>}/>
          
      </Routes>
    </div>
  );
}

export default App;
