import React from "react";
import MainHeader from "../components/MainHeader";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <div className="  bg-slate-300">
      <MainHeader />
      <div className=" flex items-center justify-center">
        <div className="w-2/3 p-4 my-20 max-w-sm h-full bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
