import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageZero from './Components/Page0/Page0';
import SchoolComponents from './Components/PageSchool/SchoolPage';
import CollegeComponents from './Components/PageCollege/CollegePage';
import StudentRegisterForm from './Components/Registration/Register';
import VideosComponent from './Components/Video/Video';
import VideoPlayer from './Components/Video/VideoPlayer';
import { AuthProvider } from './Context/AuthProvider';

// import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import ProtectedLayout from './Components/ProtectedLayout/ProtectedLayout';
import WarningPage from './Components/NotApprovedPage/NotAprovedComponent';
import Login from './Components/Login/LoginComonent';
import Footer from './Components/Footer/Footer';
import UserProfile from './Components/UserProfile/UserProfile';
import ResetPasswordPage from './Components/ForgotPassword/ResetPassword';


function App() {
  return (
    <AuthProvider>
    <Router>
      
    <Routes>
    <Route path="/" element={<PageZero></PageZero>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/school" element={<SchoolComponents></SchoolComponents>}></Route>
    <Route path="/college" element={<CollegeComponents></CollegeComponents>}></Route>
    <Route path='/register' element={<StudentRegisterForm/>}></Route>
    <Route path='/not-approved' element={<WarningPage/>}/>
    <Route path='/reset-password/:token' element={<ResetPasswordPage></ResetPasswordPage>}></Route>
    <Route element={<ProtectedLayout/>}>
        <Route path='/profile' element={<UserProfile></UserProfile>}></Route>
        <Route path='/videos' element={<VideosComponent/>}></Route>
        <Route path='/video/:id' element={<VideoPlayer/>}></Route>
    </Route>
    
    </Routes>
    </Router>
    </AuthProvider>
    
  );
}

export default App;
