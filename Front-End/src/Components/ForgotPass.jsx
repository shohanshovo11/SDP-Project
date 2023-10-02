import React from "react";
export const ForgotPassword = () => {
  return (
      <div className="bg-[#165069fc] flex w-screen h-screen relative">
          <div
            className="absolute w-[550px] h-[578px] top-[11px] left-0 img1 mt-16 ml-10"
            alt="Forgot password"
            src="/assets/forgotPass/fp-1.svg"
          />
          <div className="absolute w-[683px] h-[459px] top-0 left-[698px] mt-20 ml-5">
            <div className="absolute top-0 left-0 [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#7aabb6bd] text-[36px] tracking-[0] leading-[normal]">
              Forgot Password
            </div>
            <p className="absolute w-[675px] top-[92px] left-0 [font-family:'Poppins-Regular',Helvetica] font-normal text-[#f1f4f9f5] text-[28px] tracking-[-0.61px] leading-[40px]">
              The verification code will be sent to your <br />
              E-mail, please check it .
            </p>
            <input
              type="text"
              className="absolute w-[675px] h-[90px] top-[231px] left-0 bg-[#213440] rounded-[8px] [font-family:'Poppins-Regular',Helvetica] font-normal text-[#e9dfdfed] text-[24px] tracking-[-0.72px] leading-[28.7px] whitespace-nowrap pl-10"
              placeholder="Email"
            />
            <button className="absolute w-[497px] h-[80px] top-[379px] left-[89px] bg-[#7aabb6bd] rounded-[8.64px] shadow-[0px_2.16px_10.8px_#155069cf]">
              <div className="absolute w-[167px] top-[18px] left-[165px] [font-family:'Poppins-Medium',Helvetica] font-medium text-white text-[30px] tracking-[0] leading-[normal]">
                Send Code
              </div>
            </button>
          </div>
        <div className="absolute w-[284px] top-[34px] left-[41px] [text-shadow:3px_4px_3px_#f5f5f526] [font-family:'Red_Rose-Bold',Helvetica] font-bold text-neutral-50 text-[35px] tracking-[0] leading-[normal]">
          Study WorkNet
        </div>
    </div>
  );
};
