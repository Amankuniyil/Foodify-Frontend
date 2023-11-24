import { useState } from "react";
import { Link, NavLink, useLocation ,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { clearUser } from '../../redux/store';
import { toast } from 'react-toastify';
import AdminRouter from "../../Router/AdminRouter";
import Logout from "../Auth/Logout";
import { useSelector } from 'react-redux';

export default function Sidebar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const user = useSelector(state => state.user);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch(); 
    const location = useLocation(); 
    const navigate = useNavigate(); 
    // const handleLogout = () => {
    //   dispatch(clearUser());
    //   toast.success('Logged out');
    //   navigate('/login') 
    //   };
    return (
        <div >

<nav class="bg-black shadow ">
    <div class="container flex items-center justify-center p-6 mx-auto text-white capitalize ">
    <Link to="/admin" className="text-base text-white font-normal p-2 hover:bg-gray-100 flex items-center">
        <a href="#" class="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">home</a>
        </Link>

        <Link to="/admin/users" className="text-base text-white font-normal p-2 hover:bg-gray-100 flex items-center">

        <a href="#" class="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Users</a>
        </Link>

        <Link to="/admin/restaurants" className="text-base text-white font-normal p-2 hover:bg-gray-100 flex items-center">

        <a href="#" class="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Restaurants</a>
        </Link>

        <Link to="/admin/orders" className="text-base text-white font-normal p-2 hover:bg-gray-100 flex items-center">

        <a href="#" class="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Orders</a>
        </Link>
        <div className="relative inline-block text-left">
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

        

    </div>
</nav>
          
    
    </div>
    );
}