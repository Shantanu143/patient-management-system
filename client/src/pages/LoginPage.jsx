import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form className=" min-w-40 w-2/6 mx-auto ">
        <div className="mb-5">
          <label
            for="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="username"
            id="username"
            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring focus:ring-red-600"
            placeholder="name@doctor.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none  focus:ring focus:ring-red-600"
            required
          />
        </div>

        <button
          type="submit"
          className="relative group text-white bg-[#FF520E] overflow-hidden font-medium rounded-lg text-sm w-full sm:w-auto text-center transition-all"
        >
          <span className="block transition-transform transform group-hover:-translate-y-full duration-500  px-5 py-2.5">
            Submit
          </span>
          <span className="absolute inset-0 block transition-transform transform translate-y-full group-hover:translate-y-0 duration-500 px-5 py-2.5">
            Submit
          </span>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
