import React from 'react';

const LandingPage = () => {
  return (
    <div className="text-white px-20">
      <nav className="w-full  flex justify-between flex-row items-center ">
        <img
          src="/trackcare-high-resolution-logo-fotor-bg-remover-2025010811270.png"
          alt=""
          className="w-20 h-16 md:w-40 md:h-32"
        />
        <div>
          <button className="md:px-4 md:py-2 px-2 py-1 text-sm md:text-base rounded-xl border border-[#FF520E]">
            Login
          </button>
        </div>
      </nav>
      <div className="py-10">
        <h1 className="text-[5vw] font-inter leading-none w-3/4 font-medium">
          Streamline patient records with{' '}
          <span className="text-[#FF520E]">Trackcare.</span>
        </h1>
        <p className="py-4 sm:text-xl text-slate-200 text-sm ">
          Aligning Care, Simplifying Records.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
