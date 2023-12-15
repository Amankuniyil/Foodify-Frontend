
import { Link } from 'react-router-dom';
import NotifyPage from './Notify';
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from '../Auth/Logout';
import Notify from '../Restaurants/Notify';

const ResSideBar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector(state => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <aside
      id="sidebar"
      className="fixed z-20 h-16 top-0 left-0 flex flex-shrink-0 bg-white w-full border-b border-gray-200 transition-width duration-75"
      aria-label="Sidebar"
    >
        
      
      <div className="relative flex-1 flex min-h-0 bg-white pt-0">
        <div className="flex-1 flex pt-5 pb-4">
          <div className="flex-1 px-3 bg-white divide-x space-x-1">
            
            <ul className="flex space-x-2 pb-2">
              <li>
                <Link to="/Restaurant/" className="text-base text-gray-900 font-normal p-2 hover:bg-gray-100 flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-500 transition duration-75"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                    ></path>
                    <path
                      d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
                    ></path>
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/Restaurant/addfood" className="text-base text-gray-900 font-normal p-2 hover:bg-gray-100 flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-500 transition duration-75"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    ></path>
                  </svg>
                  <span className="ml-3 flex-1 whitespace-nowrap">Add Food</span>
                </Link>
              </li>
            
              <li>
                <Link to="/Restaurant/resorders" className="text-base text-gray-900 font-normal p-2 hover:bg-gray-100 flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-500 transition duration-75"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                    ></path>
                    <path
                      d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                    ></path>
                  </svg>
                  <span className="ml-3 flex-1 whitespace-nowrap">Orders</span>
                </Link>
              </li>
              <li>
                <Link to="/Restaurant/menu" className="text-base text-gray-900 font-normal p-2 hover:bg-gray-100 flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-500 transition duration-75"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-3 flex-1 whitespace-nowrap">Menu</span>
                </Link>
              </li>
              <li>
                <Link to="/Restaurant/resprofile" className="text-base text-gray-900 font-normal p-2 hover:bg-gray-100 flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-500 transition duration-75"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-3 flex-1 whitespace-nowrap">Profile</span>
                </Link>
               
              </li>


            
              
              <li>
              <div className="relative inline-block text-left mt-2">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    >
                                        <div>
                                        <span className=" ml-3 flex-1 whitespace-nowrap">Logout</span>
                                            {/* <lord-icon
                                                src="https://cdn.lordicon.com/hbvyhtse.json"
                                                trigger="hover"
                                                colors="primary:#ffffff"
                                                style={{ width: "50px", height: "30px", paddingTop: "7px" }}
                                            >
                                            </lord-icon> */}
                                        </div>
                                    </button>
                                    {dropdownOpen && (
                                        <div className={`origin-top-right absolute md:right-0 ${menuOpen ? 'mt-2' : 'mt-4'} w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
                                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="about-menu">
                                               
                                                <div>
                                                    {<Logout />}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                                </li>
            </ul>
          
          </div>
        </div>
        <Notify/>
      </div>
    </aside>
  );
};

export default ResSideBar;
