/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ sidebarLinks, handleLogout }) => {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const currentPath = window.location.pathname;
    const savedIndex = sidebarLinks.findIndex(
      (link) => link.to === currentPath
    );
    return savedIndex !== -1 ? savedIndex : 0;
  });
  const [toggle, setToggle] = useState(false);

  const handleClick = (index) => {
    setSelectedIndex(index);
    localStorage.setItem('selectedIndex', index);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogoutWithReset = () => {
    setSelectedIndex(0);
    localStorage.removeItem('selectedIndex');
    handleLogout();
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={handleToggle}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/#" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                  Trackcare
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-all duration-300  bg-white border-r border-gray-200 sm:translate-x-0 ${
          toggle ? '-translate-x-0' : '-translate-x-full'
        } `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white flex flex-col justify-between">
          <ul className="space-y-2 font-medium">
            {sidebarLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  onClick={() => {
                    handleClick(index);
                    setToggle((prev) => !prev);
                  }}
                  className={`flex items-center p-2 rounded-lg group transition-all ease-out ${
                    selectedIndex === index
                      ? 'text-white bg-[#4880FF]'
                      : 'text-gray-900 hover:text-white hover:bg-[#4880FF]'
                  }`}
                >
                  <span className="ms-3">{link.text}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-10 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleLogoutWithReset}
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
