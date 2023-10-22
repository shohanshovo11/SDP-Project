import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import CareerGrooming from "./Components/Careergroom/CareerGrooming";
import { ForgotPassword } from "./Components/ForgotPass";
import Home from "./Components/Home";
import { Login } from "./Components/Login";
import { Profile } from "./Components/Profile/Profile";
import { ResetPass } from "./Components/ResetPassword/ResetPass";
import { SignUp } from "./Components/SignUp";
import SignUpOption from "./Components/SignUpOption";
import { VerifyPassword } from "./Components/VerifyPassword/VerifyPassword";
import { Job } from "./Components/postedJob/Job";
import RatingReview from "./Components/ratingrev/RatingReview";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import LoginOption from "./Components/LoginOption";
import { SignUpEmployer } from "./Components/SignUpEmployer";
import Modal from "./Components/postedJob/Modal";
function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home obj2={{ email: "" }} />} />
          <Route path="/login-option" element={<LoginOption />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-employer" element={<SignUpEmployer />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posted-jobs" element={<Job />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/otp" element={<VerifyPassword />} />
          <Route path="/reset-password" element={<ResetPass />} />
          <Route path="/courses" element={<CareerGrooming />} />
          <Route path="/ratings" element={<RatingReview />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/signup-option" element={<SignUpOption />} />
          <Route path="/modal" element={<Modal />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
