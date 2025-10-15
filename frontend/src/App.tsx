import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import Market from './pages/Market';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Certificate from './pages/Certificate';
import Certificates from './pages/Certificates';
import CertificateVerification from './pages/CertificateVerification';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/market" element={<Market />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/certificate/:enrollmentId" element={<Certificate />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/verify-certificate" element={<CertificateVerification />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;