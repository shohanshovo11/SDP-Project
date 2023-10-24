import { faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
function Footer() {
  return (
    <div>
    <div className='flex bg-[#E0E0E0] font-poppins font-bold pl-12 py-8'>
      <div className='flex flex-col basis-3/5'>
        <p className='text-bt opacity-60 pr-40 pb-4'>help fresh graduates who need a job opportunity to develop themselves. so it will help the business owners to save a lot of effort, time and money to get there service at the best price.</p>
        <span className='text-black pb-2'><FontAwesomeIcon icon={faEnvelope} beatFade size='lg'/> /studyworknet123@gmail.com</span>
        <span className='text-black pb-2'><FontAwesomeIcon icon={faFacebook} beatFade size='lg'/> /studyworknet123@gmail.com</span>
        <span className='text-black pb-2'><FontAwesomeIcon icon={faWhatsapp} beatFade size='lg'/>/+8801860552999</span>
      </div>
      <div className='flex flex-col basis-1/2 mt-8 items-center'>
        <a ><h1 className='text-bt opacity-100 pb-2'>Trending Category</h1></a>
        <a className='text-bt opacity-60 pb-2' href='#'>UI/UX Design</a>
        <a className='text-bt opacity-60 pb-2' href='#'>UI/UX Design</a>
        <a className='text-bt opacity-60 pb-2' href='#'>UI/UX Design</a>
        <a className='text-bt opacity-60 pb-2' href='#'>UI/UX Design</a>
        <a className='text-bt opacity-60 pb-2' href='#'>UI/UX Design</a>
        <a className='text-bt opacity-60 pb-2' href='#'>UI/UX Design</a>
        <a className='text-bt opacity-60 pb-2' href='#'>UI/UX Design</a>
        <a className='text-bt opacity-60 pb-2' href='#'>UI/UX Design</a>
      </div>
      <div className='flex flex-col text-bt opacity-60 mt-8 basis-1/2 items-end pr-56'>
        <ul className=''>
            <li className='pb-2'><a href='#'>Home</a></li>
            <li className='pb-2'><a href='#'>About Us</a></li>
            <li className='pb-2'><a href='#'>Services</a></li>
            <li className='pb-2'><a href='#'>Contact</a></li>
            <li className='pb-2'><a href='#'>How it Works?</a></li>
        </ul>
      </div>
    </div>
    <div className='bg-bt text-white font-poppins font-bold flex justify-between py-7 pl-12'>
      <div>
        Copyright &#169; All rights reserved
      </div>
      <div className='flex gap-6 pr-12'>
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
        <span>Content Privacy</span>
      </div>
    </div>
    </div>
  )
}

export default Footer
