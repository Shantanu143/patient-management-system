import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const NewLandingPage = () => {
  const { token, setToken } = useContext(AppContext);

  const handleLogout = () => {
    setToken(false);
    toast.success('successfully logout ');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    toast.success('successfully logout ');
  };

  return (
    <div className="bg-[#E1EEFF] font-nunito">
      <div className="min-h-screen font-nunito max-w-screen-2xl mx-auto">
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
            <div className="flex flex-row justify-between gap-2">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-blue-500 bg-white border border-blue-500 rounded-full font-medium hover:bg-blue-500 hover:text-white transition-all text-sm md:text-base "
                >
                  logout
                </button>
              ) : (
                <Link to={'/login'}>
                  <button className="px-3 py-1 text-blue-500 bg-white border border-blue-500 rounded-full font-medium hover:bg-blue-500 hover:text-white transition-all text-sm md:text-base ">
                    Login
                  </button>
                </Link>
              )}
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
                  <button className="font-medium lg:text-xl bg-blue-700 text-white px-6 py-2 rounded-full hover:-translate-y-1 transition-all">
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
              <span className="lg:text-6xl xl:text-7xl md:text-4xl text-2xl block">
                Efficient Management
              </span>
              <span className="lg:text-7xl xl:text-8xl md:text-5xl text-3xl text-blue-600">
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

        <div className="px-4 md:px-8 py-8 md:py-14 w-full">
          <h4 className="leading-none font-nunito font-extrabold w-full lg:text-6xl xl:text-7xl md:text-4xl text-2xl text-center">
            <span>Core </span>
            <span className="text-blue-600">Values</span>
          </h4>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:py-10 py-6 gap-6">
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
                className="px-6 py-6 rounded-tl-[5rem] rounded-br-[5rem] bg-white border-2 border-orange-300 flex flex-col items-center h-full"
                key={index}
              >
                <div className="h-2/3 flex items-center justify-center">
                  <img
                    src={item.img}
                    alt=""
                    className="max-h-full max-w-full"
                  />
                </div>
                <div className="h-1/3 text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl text-blue-700 font-bold py-2">
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
        <div className="flex flex-row items-center justify-center bg-white w-full px-4 md:px-8 py-8 md:py-14">
          <div className="md:w-1/3">
            <h3 className="leading-none font-nunito font-extrabold">
              <span className="lg:text-5xl xl:text-7xl md:text-4xl text-2xl block ">
                Features For
              </span>
              <span className="lg:text-6xl xl:text-8xl md:text-5xl text-3xl text-blue-600">
                Doctors
              </span>
            </h3>
            <div className="my-3">
              <p className="lg:text-2xl text-lg font-medium py-1">
                Access patient records instantly.
              </p>
              <p className="lg:text-2xl text-lg font-medium py-1">
                Add prescriptions with ease.
              </p>
              <p className="lg:text-2xl text-lg font-medium py-1">
                Manage appointments and follow-ups.
              </p>
              <p className="lg:text-2xl text-lg font-medium py-1">
                Generate medical certificates and treatment summaries.
              </p>
            </div>
          </div>
          <div className="md:w-1/3">
            <img src="./doctor-cartoon.png" alt="" />
          </div>
        </div>

        <div className="flex flex-row items-center justify-center w-full px-4 md:px-8 py-8 md:py-14">
          <div className="md:w-1/3">
            <img src="./attendant-cartoon.png" alt="" />
          </div>
          <div className="md:w-1/3">
            <h3 className="leading-none font-nunito font-extrabold">
              <span className="lg:text-5xl xl:text-7xl md:text-4xl text-2xl block ">
                Features For
              </span>
              <span className="lg:text-6xl xl:text-8xl md:text-5xl text-3xl text-blue-600">
                Attendants
              </span>
            </h3>
            <div className="my-3">
              <p className="lg:text-2xl text-lg font-medium py-1">
                Book appointments seamlessly.
              </p>
              <p className="lg:text-2xl text-lg font-medium py-1">
                Provide bills and manage payments.
              </p>
              <p className="lg:text-2xl text-lg font-medium py-1">
                Manage patient queues effectively.
              </p>
            </div>
          </div>
        </div>

        {/* pricing details */}
        <div className="flex flex-col items-center justify-center w-full px-4 md:px-8 py-8 md:py-14 bg-white">
          <h3 className="leading-none font-nunito font-extrabold text-center">
            <span className="lg:text-5xl xl:text-7xl md:text-4xl text-2xl block">
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
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-lg p-6 flex flex-col items-center max-w-80"
          >
            <span className="text-sm font-bold uppercase bg-gray-100 px-2 py-1 rounded-md mb-4 ">
              {plan.title}
            </span>
            <p className="text-start text-gray-600 mb-4">{plan.description}</p>
            <h3 className="text-2xl font-bold mb-2">{plan.price}</h3>
            {plan.period && (
              <p className="text-gray-500 text-sm mb-4">{plan.period}</p>
            )}
            <ul className="space-y-2 text-gray-600 text-sm mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className={`py-2 px-4 rounded ${plan.button.style}`}>
              {plan.button.text}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
