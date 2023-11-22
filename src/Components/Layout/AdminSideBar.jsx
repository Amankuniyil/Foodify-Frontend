import { useState } from "react";
import { Link, NavLink, useLocation ,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { clearUser } from '../../redux/store';
import { toast } from 'react-toastify';
import AdminRouter from "../../Router/AdminRouter";

export default function Sidebar() {
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

    </div>
</nav>
          
    
    </div>
    );
}