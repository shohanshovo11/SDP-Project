import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ForgotPassword } from './Components/ForgotPass'
import Home from './Components/Home'
import { Login } from './Components/Login'
import { Profile } from './Components/Profile/Profile'
import { Signup } from './Components/Signup/Signup/Signup'
import { Job } from "./Components/postedJob/Job"
import  CareerGrooming  from "./Components/Careergroom/CareerGrooming"
import   RatingReview from "./Components/ratingrev/RatingReview"
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
          <Route path="/career" element={<CareerGrooming />} />
          <Route path="/rate" element={<RatingReview />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

