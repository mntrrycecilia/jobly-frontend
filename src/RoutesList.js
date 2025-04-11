// src/RoutesList.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import CompanyList from "./components/CompanyList";
import CompanyDetail from "./components/CompanyDetail";
import JobList from "./components/JobList";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ProfileForm from "./components/ProfileForm";


function RoutesList({ login, signup }) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/companies" element={<CompanyList />} />
      <Route path="/companies/:handle" element={<CompanyDetail />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/signup" element={<SignupForm signup={signup} />} />
      <Route path="/profile" element={<ProfileForm />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesList;
