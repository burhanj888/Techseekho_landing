import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageZero from './Components/Page0/Page0';
import SchoolComponents from './Components/PageSchool/SchoolPage';
import CollegeComponents from './Components/PageCollege/CollegePage';


function App() {
  return (
    
    <Router>
      
    <Routes>
    <Route path="/" element={<PageZero></PageZero>}></Route>
    <Route path="/school" element={<SchoolComponents></SchoolComponents>}></Route>
    <Route path="/college" element={<CollegeComponents></CollegeComponents>}></Route>
    </Routes>
    </Router>
    
    
  );
}

export default App;
