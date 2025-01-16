import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const LandingPage = () => {
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
    <div className="text-white md:px-20 px-10 mx-auto bg-custom-gradient min-h-screen">
      <nav className="w-full  flex justify-between flex-row items-center py-4 md:py-8">
        <div className="uppercase font-bold transition-all hover:-translate-y-1 hover:shadow-md">
          Trackcare
        </div>
        <div>
          {token ? (
            <button
              onClick={handleLogout}
              className="md:px-4 md:py-2 px-2 py-1 text-sm md:text-base rounded-xl border-2 border-blue-300 hover:text-blue-500 transition-all hover:-translate-y-1"
            >
              logout
            </button>
          ) : (
            <Link to={'/login'}>
              <button className="md:px-4 md:py-2 px-2 py-1 text-sm md:text-base rounded-xl border-2 border-blue-300 hover:text-blue-500 transition-all hover:-translate-y-1">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
      <div className=" py-6 relative z-10">
        <h1 className="relative text-[clamp(2rem,5vw,4rem)] font-inter leading-none md:w-3/4 w-4/5 font-medium text-white before:content-['Streamline_patient_records_with_Trackcare.'] before:absolute before:-z-10 before:-top-1 before:-left-1 before:text-blue-900">
          Streamline patient records with{' '}
          <span className="text-blue-500">Trackcare.</span>
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
              className="relative flex flex-col  my-2  mx-2 bg-transparent hover:bg-card-gradient shadow-sm border-2 border-blue-300 rounded-tl-lg rounded-br-lg rounded-bl-3xl rounded-tr-3xl max-w-60  p-2 text-start transition-all ease-in duration-300 hover:-translate-y-1"
              key={index}
            >
              <div className="flex items-center p-2">
                <h5
                  className=" text-white font-semibold "
                  style={{ fontSize: 'clamp(1rem, 2.5vw, 1.50rem)' }}
                >
                  {item.title}
                </h5>
              </div>
              <p
                className="block text-slate-200 leading-normal font-light p-2 "
                style={{ fontsize: 'clamp(10px, 2vw, 16px)]' }}
              >
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
