// routes.js
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import ProtectedHeader from '../Header2/ProtectedHeader';
import Footer from '../Footer/Footer';
import useAuth from '../../Hooks/AuthHooks';

function ProtectedLayout() {

    console.log("in protected");
    const user = JSON.parse(localStorage.getItem('student')) || {};
    console.log(user);

    // Check if user data exists in localStorage
    if (Object.keys(user).length === 0) {
        return <Navigate to="/" />;
    }

    const isAuthed = Boolean(user.accessToken);
    const isApproved = user.approved;

    console.log(isAuthed);
    console.log("in layout", user, isAuthed);

    if (!isAuthed) {
      return <Navigate to="/" />;
    }
    if (!isApproved) {
        return <Navigate to="/not-approved"/>;
    }

    return (
      <>
        <ProtectedHeader />
        <Outlet />
        <Footer></Footer>
      </>
    );
}

export default ProtectedLayout;
