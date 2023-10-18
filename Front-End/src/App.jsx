import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CareerGrooming from "./Components/Careergroom/CareerGrooming"
import { ForgotPassword } from './Components/ForgotPass'
import Home from './Components/Home'
import { Login } from './Components/Login'
import { Profile } from './Components/Profile/Profile'
import { ResetPass } from "./Components/ResetPassword/ResetPass"
import { Signup } from './Components/Signup/Signup/Signup'
import { VerifyPassword } from "./Components/VerifyPassword/VerifyPassword"
import { Job } from "./Components/postedJob/Job"
import RatingReview from "./Components/ratingrev/RatingReview"
import PostJobtutor from './Components/PostJob/PostJobtutor'
function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home obj2={{email:""}}/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/posted-jobs" element={<Job/>} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/otp" element={<VerifyPassword />} />
          <Route path="/reset" element={<ResetPass />} />
          <Route path="/courses" element={<CareerGrooming />} />
          <Route path="/ratings" element={<RatingReview />} />
          <Route path="/tutorjob" element={<PostJobtutor />} />

        </Routes>
        <ToastContainer />
      </main>
    </BrowserRouter>
  )
}

export default App

