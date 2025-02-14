import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const NewLandingPage = () => {
  const { token, setToken } = useContext(AppContext);
  const [role, setRole] = useState(false);

  useEffect(() => {
    if (token) {
      const seeRole = localStorage.getItem('role');
      setRole(seeRole === 'doctor' ? 'doctor' : 'admin');
    } else {
      setRole(false);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    toast.success('successfully logout ');
  };

  return (
    <div className="bg-[#E1EEFF] font-nunito">
      <div className="min-h-screen font-nunito">
        {/* navbar */}
        <nav className="bg-[#E1EEFF] px-4 md:px-8 py-4 md:py-6 w-full">
          <div className="flex flex-row justify-between items-center">
            <div className="font-medium text-xl">LoGo</div>
            <div className="hidden md:flex flex-row justify-between items-center gap-2 md:gap-6">
              <a href="#home" className="font-medium text-slate-500">
                Home
              </a>
              <a href="#about" className="font-medium text-slate-500">
                About
              </a>
              <a href="#features" className="font-medium text-slate-500">
                Features
              </a>
              <a href="#pricing" className="font-medium text-slate-500">
                Pricing
              </a>
            </div>
            <div className="flex flex-row justify-between gap-2">
              {token ? (
                <Link
                  to={
                    role === 'doctor' ? '/doctor-dashboard' : '/admin-dashboard'
                  }
                >
                  <button className="bg-white hover:bg-blue-500 px-3 py-1 border border-blue-500 rounded-full font-medium text-blue-500 hover:text-white text-sm md:text-base transition-all">
                    Go to Dashboard
                  </button>
                </Link>
              ) : (
                <Link to={'/login'}>
                  <button className="bg-white hover:bg-blue-500 px-3 py-1 border border-blue-500 rounded-full font-medium text-blue-500 hover:text-white text-sm md:text-base transition-all">
                    Login
                  </button>
                </Link>
              )}
              {token && (
                <button
                  onClick={handleLogout}
                  className="bg-blue-500 px-3 py-1 border border-white rounded-full font-medium text-white text-sm md:text-base"
                >
                  logout
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* home */}
        <div id="home" className="bg-[#E1EEFF]">
          <div className="relative w-full h-full">
            <div className="flex flex-col bg-[#E1EEFF] px-4 md:px-8 py-8 md:py-14 w-full">
              <div className="flex-grow md:w-1/2">
                <div className="font-extrabold text-[clamp(2rem,6.5vw,6rem)] leading-none">
                  <span className="text-black">Effortless </span>
                  <span className="block text-blue-700">Clinic</span>
                  <span className="inline-block text-blue-700">Management</span>
                </div>
                <p className="py-2 font-medium text-[clamp(16px,1.6vw,24px)] text-slate-500">
                  Empowering Doctors & Streamlining Patient Care
                </p>
                <div className="my-6">
                  <button className="bg-blue-700 px-6 py-2 rounded-full font-medium text-white lg:text-xl transition-all hover:-translate-y-1">
                    Register Your Clinic
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-blue-700 text-white">
              <div className="flex flex-row justify-start items-center px-2 md:px-8 py-4 md:py-6">
                <div className="flex flex-col items-center px-2 md:px-4 border-white border-r text-center">
                  <span className="font-extrabold md:text-2xl lg:text-5xl">
                    100%
                  </span>
                  <span>Uptime Guarantee</span>
                </div>
                <div className="flex flex-col items-center px-2 md:px-4 border-white border-r text-center">
                  <span className="font-extrabold md:text-2xl lg:text-5xl">
                    24/7
                  </span>
                  <span>Tech Support</span>
                </div>
                <div className="flex flex-col items-center px-2 md:px-4 border-white text-center">
                  <span className="font-extrabold md:text-2xl lg:text-5xl">
                    10x
                  </span>
                  <span>Fast Operations</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:block right-0 bottom-0 absolute h-full">
              <img
                src="/doctor-image.png"
                alt=""
                className="px-5 md:px-10 w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* about */}
        <div
          id="about"
          className="flex sm:flex-row flex-col items-center bg-white px-4 md:px-8 py-8 md:py-14 w-full"
        >
          <div className="w-full sm:w-3/5">
            <h3 className="w-full font-nunito font-extrabold leading-none">
              <span className="block text-2xl md:text-4xl lg:text-6xl xl:text-7xl">
                Efficient Management
              </span>
              <span className="text-blue-600 text-3xl md:text-5xl lg:text-7xl xl:text-8xl">
                Guaranteed!
              </span>
            </h3>
            <div className="w-full sm:w-4/5">
              <p className="py-4 font-medium text-lg md:text-xl lg:text-2xl">
                Welcome to [Software Name], your trusted solution for modern
                clinic management. Designed with healthcare professionals in
                mind, our platform simplifies operations, enhances patient
                experiences, and saves time.
              </p>
              <p className="py-4 font-medium text-lg md:text-xl lg:text-2xl">
                From booking appointments to prescribing medications, we provide
                an all-in-one platform to empower your practice.
              </p>
            </div>
          </div>
          <div className="w-2/5">
            <img src="./2.png" alt="" className="" />
          </div>
        </div>

        {/* core values */}
        <div className="px-4 md:px-8 py-8 md:py-14 w-full">
          <h4 className="w-full font-nunito font-extrabold text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-center leading-none">
            <span>Core </span>
            <span className="text-blue-600">Values</span>
          </h4>
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-6 md:py-10">
            {[
              {
                img: './3.png',
                title: 'Efficiency',
                desc: 'Streamline operations for better productivity.',
              },
              {
                img: './4.png',
                title: 'Security',
                desc: 'Ensure patient data remains confidential.',
              },
              {
                img: './5.png',
                title: 'Ease of Use',
                desc: 'Intuitive interfaces for everyone.',
              },
            ].map((item, index) => (
              <div
                className="flex flex-col items-center bg-white px-6 py-6 border-2 border-orange-300 rounded-tl-[5rem] hover:rounded-tl-none hover:rounded-tr-[5rem] hover:rounded-bl-[5rem] rounded-br-[5rem] hover:rounded-br-none transition-all hover:-translate-y-1"
                key={index}
              >
                <div className="flex justify-center items-center h-2/3">
                  <img
                    src={item.img}
                    alt=""
                    className="max-w-full max-h-full"
                  />
                </div>
                <div className="h-1/3 text-center">
                  <div className="py-2 font-bold text-blue-700 text-xl md:text-2xl lg:text-3xl">
                    {item.title}
                  </div>
                  <p className="font-medium text-base lg:text-lg">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* features */}
        <div
          id="features"
          className="flex flex-row justify-center items-center bg-white px-4 md:px-8 py-8 md:py-14 w-full"
        >
          <div className="md:w-1/3">
            <h3 className="font-nunito font-extrabold leading-none">
              <span className="block text-2xl md:text-4xl lg:text-5xl xl:text-7xl">
                Features For
              </span>
              <span className="text-blue-600 text-3xl md:text-5xl lg:text-6xl xl:text-8xl">
                Doctors
              </span>
            </h3>
            <div className="my-3">
              <p className="py-1 font-medium text-base md:text-lg lg:text-2xl">
                Access patient records instantly.
              </p>
              <p className="py-1 font-medium text-base md:text-lg lg:text-2xl">
                Add prescriptions with ease.
              </p>
              <p className="py-1 font-medium text-base md:text-lg lg:text-2xl">
                Manage appointments and follow-ups.
              </p>
              <p className="py-1 font-medium text-base md:text-lg lg:text-2xl">
                Generate medical certificates and treatment summaries.
              </p>
            </div>
          </div>
          <div className="md:w-1/3">
            <img src="./doctor-cartoon.png" alt="" />
          </div>
        </div>

        <div className="flex flex-row justify-center items-center px-4 md:px-8 py-8 md:py-14 w-full">
          <div className="md:w-1/3">
            <img src="./attendant-cartoon.png" alt="" />
          </div>
          <div className="md:w-1/3">
            <h3 className="font-nunito font-extrabold leading-none">
              <span className="block text-2xl md:text-4xl lg:text-5xl xl:text-7xl">
                Features For
              </span>
              <span className="text-blue-600 text-3xl md:text-5xl lg:text-6xl xl:text-8xl">
                Attendants
              </span>
            </h3>
            <div className="my-3">
              <p className="py-1 font-medium text-base md:text-lg lg:text-2xl">
                Book appointments seamlessly.
              </p>
              <p className="py-1 font-medium text-base md:text-lg lg:text-2xl">
                Provide bills and manage payments.
              </p>
              <p className="py-1 font-medium text-base md:text-lg lg:text-2xl">
                Manage patient queues effectively.
              </p>
            </div>
          </div>
        </div>

        {/* pricing details */}
        <div
          id="pricing"
          className="flex flex-col justify-center items-center bg-white px-4 md:px-8 py-8 md:py-14 w-full"
        >
          <h3 className="font-nunito font-extrabold text-center leading-none">
            <span className="block text-2xl md:text-4xl lg:text-5xl xl:text-7xl">
              Pricing <span className="text-blue-600">Details</span>
            </span>
          </h3>

          <PricingDetails />
        </div>
      </div>
    </div>
  );
};

export default NewLandingPage;

const PricingDetails = () => {
  const plans = [
    {
      title: 'BASIC',
      description:
        'For all small volume clinics who want to start with managing.',
      price: '₹4999/-',
      period: 'Per member, per year',
      features: [
        'Access to All Basic Features',
        '1k new patients / per month',
        '1 Attendant Dashboard / per clinic',
        '1 Doctor Dashboard / per clinic',
        'Appointment Booking Portal (Coming Soon)',
      ],
      button: {
        text: 'Start free 14-day Trial',
        style: 'bg-black text-white hover:bg-gray-800',
      },
    },
    {
      title: 'ADVANCED',
      description:
        'For all mid-range volume clinics who want to start with managing.',
      price: '₹8999/-',
      period: 'Per member, per year',
      features: [
        'Access to All Basic Features',
        'Unlimited new patients / per month',
        '1 Attendant Dashboard / per clinic',
        '5 Doctor Dashboard / per clinic',
        'Appointment Booking Portal (Coming Soon)',
      ],
      button: {
        text: 'Start free 14-day Trial',
        style: 'bg-black text-white hover:bg-gray-800',
      },
    },
    {
      title: 'ENTERPRISE',
      description:
        'For all large scale hospitals who want to start with managing.',
      price: 'Contact Sales',
      period: '',
      features: [
        'Get customized features as required',
        'Shift old database hassle-free',
        'Add labs & chemists too!',
        'Full flagged hospital ERP',
        'Hassle-Free Hospital Management',
      ],
      button: {
        text: 'Call Sales Team',
        style: 'bg-black text-white hover:bg-gray-800',
      },
    },
  ];

  return (
    <div className="bg-white p-6">
      <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col items-center shadow-md hover:shadow-xl p-6 border rounded-lg transition-all hover:-translate-y-1 duration-200 ease-out"
          >
            <span className="self-start bg-gray-100 mb-4 px-2 py-1 rounded-md font-bold text-sm text-left uppercase">
              {plan.title}
            </span>
            <p className="text-gray-600 text-sm text-start">
              {plan.description}
            </p>
            <div className="my-3 py-3 border-y w-full text-center">
              <h3 className="mb-2 font-nunito font-extrabold text-2xl lg:text-5xl">
                {plan.price}
              </h3>
              {plan.period && (
                <p className="font-semibold text-gray-500 text-sm">
                  {plan.period}
                </p>
              )}
            </div>
            <ul className="space-y-2 mb-6 text-gray-600 text-sm">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start text-black text-sm">
                  <span className="bg-black mr-2 px-1 rounded-[50%] text-white">
                    ✔
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`py-2 px-4 rounded text-sm font-bold ${plan.button.style}`}
            >
              {plan.button.text}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
