import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CareerGrooming from "./Components/Careergroom/CareerGrooming";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import { ForgotPassword } from "./Components/ForgotPass";
import Home from "./Components/Home";
import { Login } from "./Components/Login";
import { Profile } from "./Components/Profile/Profile";
import { ResetPass } from "./Components/ResetPassword/ResetPass";
import { SignUp } from "./Components/SignUp";
import SignUpOption from "./Components/SignUpOption";
import { VerifyPassword } from "./Components/VerifyPassword/VerifyPassword";
import { Job } from "./Components/postedJob/Job";
import RatingReview from "./Components/Rating/RatingReview";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import LoginOption from "./Components/LoginOption";
import { SignUpEmployer } from "./Components/SignUpEmployer";
import PostJobtutor from "./Components/PostJob/PostJobtutor";
import Pendingjob from "./Components/PostJob/Pendingjob";
import PartTime from "./Components/PostJob/PartTime";
import Freelance from "./Components/PostJob/Freelance";
import EmployerDashboard from "./Components/EmployerDashboard/EmployerDashboard";
import ApplicantList from "./Components/ApplicantList/ApplicantList";
import Internship from "./Components/PostJob/Internship";
import { EmployersJoblist } from "./Components/EmployersJoblist/EmployersJoblist";
import EmployerProfile from "./Components/EmployerProfile/EmployerProfile";
import { AdminLogin } from "./Components/AdminLogin";
import ApplicantListShovo from "./Components/ApplicantList/ApplicantListShovo";
import AppliedList from "./Components/ApplicantList/AppliedList";
// import CGrooming from "./Components/CGrooming/CGrooming"
import ViewApprove from "./Components/Rating/ViewApprove";
import NotificationTable from "./Components/NotificationTable";
import CGrooming from "./Components/CGrooming/CGrooming";
// import ModalProfile from "./Components/PostJob/ModalProfile";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home obj2={{ email: "" }} />} />
          <Route path="/login-option" element={<LoginOption />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-employer" element={<SignUpEmployer />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posted-jobs" element={<Job />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/otp" element={<VerifyPassword />} />
          <Route path="/reset-password" element={<ResetPass />} />
          {/* o<Route path="/courses" element={<CareerGrooming />} /> */}
          <Route path="/ratings" element={<RatingReview />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/signup-option" element={<SignUpOption />} />
          <Route path="/ApplicantList" element={<ApplicantList />} />
          <Route path="/ApplicantListShovo" element={<ApplicantListShovo />} />
          <Route path="/tutorjob" element={<PostJobtutor />} />
          <Route path="/internjob" element={<Internship />} />
          <Route path="/parttimejob" element={<PartTime />} />
          <Route path="/freelancejob" element={<Freelance />} />
          <Route path="/pendingjob" element={<Pendingjob />} />
          <Route path="/employerdash" element={<EmployerDashboard />} />
          <Route path="/employers-joblist" element={<EmployersJoblist />} />
          <Route path="/employer-profile" element={<EmployerProfile />} />
          <Route path="/notification" element={<NotificationTable />} />
          <Route path="/ApplicantList/AppliedList/:jobId" element={<AppliedList />}/>
          <Route path="/courses" element={<CGrooming />} />
          <Route path="/view-approve" element={<ViewApprove />} />
          {/* <Route path="/rating-review" element={<RatingReview />} /> */}
          {/* <Route path="/modalopen" element={<ModalProfile />} /> */}
        </Routes>
        <ToastContainer />
      </main>
    </BrowserRouter>
  );
}

export default App;
