import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import BodyPage from "./components/BodyPage";
import ServiceDetails from "./components/ServiceDetails";
import Login from './components/Login';
import SignIn from './components/SignIn';
import ScrollToTop from "./components/ScrollToTop";
import AdminPage from "./components/AdminPage";
import { Myaccount } from "./components/Myaccount";
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
        <Route path="/myaccount" element={<Myaccount/>}/>
        {/* <Route path="/register-business" element={<RegisterBusiness />} />
        <Route path="/pricing" element={<Pricing />} /> */}
       
        
      </Routes>
    </Router>
  );
}

export default App;
