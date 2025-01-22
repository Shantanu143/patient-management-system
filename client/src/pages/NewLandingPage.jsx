const NewLandingPage = () => {
  return (
    <div className="bg-[#E1EEFF] font-nunito">
      <div className="min-h-screen font-nunito max-w-[1500px] mx-auto">
        {/* navbar */}
        <nav className="w-full px-4 md:px-8 py-4 md:py-6 bg-[#E1EEFF]">
          <div className="flex flex-row justify-between items-center">
            <div className="text-xl font-medium">LoGo</div>
            <div className=" flex flex-row items-center justify-between gap-6    ">
              <a href="#" className="text-slate-500 font-medium">
                Home
              </a>
              <a href="#" className="text-slate-500 font-medium">
                About
              </a>
              <a href="#" className="text-slate-500 font-medium">
                Features
              </a>
              <a href="#" className="text-slate-500 font-medium">
                Pricing
              </a>
            </div>
            <div className="flex flex-row justify-between gap-2    ">
              <button className="px-3 py-1 text-blue-500 bg-white border border-blue-500 rounded-full font-medium">
                Login
              </button>
              <button className="px-3 py-1 bg-blue-500 text-white border border-white rounded-full font-medium">
                Register
              </button>
            </div>
          </div>
        </nav>

        {/* home */}
        <div className="bg-[#E1EEFF]">
          <div className="w-full h-full relative">
            <div className="flex flex-col w-full bg-[#E1EEFF] px-4 md:px-8 py-8 md:py-14">
              <div className="w-1/2 flex-grow">
                <div className="font-extrabold text-[clamp(2rem,6.5vw,6rem)] leading-none">
                  <span className="text-black">Effortless </span>
                  <span className="text-blue-700 block">Clinic</span>
                  <span className="text-blue-700 inline-block">Management</span>
                </div>
                <p className="text-slate-500 font-medium py-2 text-[clamp(16px,1.6vw,24px)]">
                  Empowering Doctors & Streamlining Patient Care
                </p>
                <div className="my-6">
                  <button className="font-medium lg:text-xl bg-blue-700 text-white px-6 py-2 rounded-full">
                    Register Your Clinic
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-blue-700 text-white">
              <div className="flex flex-row items-center justify-start px-2 md:px-8 py-4 md:py-6">
                <div className="flex flex-col items-center border-r border-white md:px-4 px-2">
                  <span className="lg:text-5xl md:text-2xl font-extrabold">
                    100%
                  </span>
                  <span>Uptime Guarantee</span>
                </div>
                <div className="flex flex-col items-center border-r border-white md:px-4 px-2">
                  <span className="lg:text-5xl md:text-2xl font-extrabold">
                    24/7
                  </span>
                  <span>Tech Support</span>
                </div>
                <div className="flex flex-col items-center  border-white md:px-4  px-2">
                  <span className="lg:text-5xl md:text-2xl font-extrabold">
                    10x
                  </span>
                  <span>Fast Operations</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:block absolute bottom-0 right-0 h-full">
              <img
                src="./doctor-image.png"
                alt=""
                className="w-full h-full md:px-10 px-5"
              />
            </div>
          </div>
        </div>

        {/* about */}
        <div className="px-4 md:px-8 py-8 md:py-14 w-full bg-white flex  items-center ">
          <div className="w-3/5 ">
            <h3 className="leading-none font-nunito font-extrabold w-full">
              <span className="lg:text-7xl md:text-4xl text-2xl block">
                Efficient Management
              </span>
              <span className="lg:text-8xl md:text-5xl text-3xl text-blue-700">
                Guaranteed!
              </span>
            </h3>
            <div className="w-4/5 ">
              <p className="lg:text-2xl md:text-xl text-lg font-medium py-4">
                Welcome to [Software Name], your trusted solution for modern
                clinic management. Designed with healthcare professionals in
                mind, our platform simplifies operations, enhances patient
                experiences, and saves time.
              </p>
              <p className="lg:text-2xl md:text-xl text-lg font-medium py-4">
                From booking appointments to prescribing medications, we provide
                an all-in-one platform to empower your practice.
              </p>
            </div>
          </div>
          <div className="w-2/5">
            <img src="./2.png" alt="" className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLandingPage;
