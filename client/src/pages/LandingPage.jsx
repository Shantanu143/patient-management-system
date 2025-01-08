import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="text-white md:px-20 px-10 mx-auto">
      <nav className="w-full  flex justify-between flex-row items-center py-4 md:py-8">
        <div className="uppercase font-bold transition-all hover:-translate-y-1">
          Trackcare
        </div>
        <div>
          <Link to={'/login'}>
            <button className="md:px-4 md:py-2 px-2 py-1 text-sm md:text-base rounded-xl border border-[#FF520E] hover:text-[#FF520E] transition-all hover:-translate-y-1">
              Login
            </button>
          </Link>
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
      <div className="flex flex-row flex-wrap justify-evenly">
        {[
          {
            title: 'Manage Patient Records',
            desc: 'Easily add and update patient details for efficient care.',
          },
          {
            title: 'Prescription Management',
            desc: 'Create, manage, and track prescriptions with ease.',
          },
          {
            title: 'Quick Bill Generation',
            desc: 'Generate and print patient bills in just a few clicks.',
          },
          {
            title: 'Patient History Overview',
            desc: 'View detailed patient records for informed care.',
          },
        ].map((item, index) => {
          return (
            <div
              className="relative flex flex-col my-3  mx-3 bg-transparent hover:bg-card-gradient shadow-sm border border-[#ff520e51] rounded-tl-lg rounded-br-lg rounded-bl-3xl rounded-tr-3xl max-w-60 p-4 text-start transition-all ease-in duration-300 hover:-translate-y-1"
              key={index}
            >
              <div className="flex items-center p-2">
                <h5 className=" text-white text-base lg:text-[1.5vw] font-semibold">
                  {item.title}
                </h5>
              </div>
              <p className="block text-slate-200 leading-normal font-light text-sm md:text-base p-2">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingPage;
