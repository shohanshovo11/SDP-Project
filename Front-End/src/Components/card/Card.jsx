import React from 'react';

function Card(props) {
  const shadowClass = props.obj.shadow ? 'shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]' : '';
  const bgGrey = 'bg-[#CEDADF]'
  const bgWhite = 'bg-[#FFFFFF]'
  const backgroundColor = `bg-[${props.obj.col}]`;
  return (
    <div className={`flex flex-col ${backgroundColor} w-52 font-poppins items-center rounded-md ${shadowClass}`}>
      <div className='pt-8 pb-5'>
        <img src={`${props.obj.src}`} className='w-20' alt={props.obj.text}></img>
      </div>
      <span className='text-bt font-bold text-lg'>{props.obj.text}</span>
      <span className='text-gray-500 font-bold text-sm pb-12'>{props.obj.text2}</span>
    </div>
  )
}

export default Card

