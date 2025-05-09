import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import BodyPage from "./components/BodyPage";
import ServiceDetails from "./components/ServiceDetails";
import Login from './components/Login';
import SignIn from './components/SignIn';
import ScrollToTop from "./components/ScrollToTop";
import AdminPage from "./components/AdminPage";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BodyPage />} />
          <Route path="service/:id" element={<ServiceDetails />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
