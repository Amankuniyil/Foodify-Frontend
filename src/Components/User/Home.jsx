import React, { useEffect, useState } from 'react';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import Loading from '../Layout/Loading';
import Sidebar from '../Layout/AdminSideBar';

import {
  
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
  iconButton,
} from "@material-tailwind/react";

import { useSelector } from 'react-redux';
import api from '../../api/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [selectedType, setSelectedType] = useState("All"); // Initially, show all restaurants



  const [restaurantProfiles, setRestaurantProfiles] = useState([]);
  const [loading, setLoading] = useState(true);


  const filteredRestaurantProfiles = restaurantProfiles.filter((profile) => {
    if (selectedType === "All") {
      return true; // Show all restaurants when "All" is selected
    } else {
      return profile.type === selectedType; // Filter based on the selected type
    }
  });
  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('restaurant/restaurant-profiles/');
        setRestaurantProfiles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant profiles:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  

  const navigate = useNavigate();


  




  return (
    <div className="w-full">
      <Navbar />
      
      <div className="flex flex-col lg:flex-row bg-gradient-to-r from-yellow-200 to-yellow-400 mt-12"style={{ height: "620px" }} >
        <div className="hidden lg:block lg:w-1/2" style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)" }} >
          <br />
          <br /><br /><br />
        <div className="h-full object-cover" style={{ backgroundImage: "url(/images/foodcover.png)", backgroundRepeat: "no-repeat" }} ></div>

        </div>
        <div className="flex flex-col justify-center items-center lg:items-start lg:w-1/2 px-4 md:px-6" style={{ height: "620px" }} >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white md:text-5xl drop-shadow-md">
              Find Your Favourite Restaurants on Foodify
            </h2>
            <p className="mt-2 text-base text-white md:text-lg font-serif">
            
            </p>
          
          </div>
          
        </div>
        
        

                
        
      </div> 
      
      <div className="hidden lg:block lg:w-1/2" style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)" }} >
          <br />
          
        

        </div><div class="font-light text-gray-500 sm:text-lg dark:text-gray-400 mx-5">
        <br />
                
                <p class="text-center mx-auto mb-4 w-3/3">Welcome to Foodify, the ultimate solution for food enthusiasts. With our app, you can effortlessly order your most beloved dishes from a variety of restaurants, all in one place.</p>
                <br /> 
               
    
                
            </div>
            <div className="m-20">
      <img src="/images/foodifybanner.png" alt="Image " />
    </div>
    <h2 class="mb-4 text-4xl logo-letter  text-orange-500 flex justify-center items-center">Restaurants</h2>






   <br />




<div class="flex justify-between w-full">
  <div class="w-1/3  p-4 flex items-center justify-center">
    <button
      onClick={() => setSelectedType('All')}
      className="w-120 h-10 text-xl text-orange-400"
    >
      All
    </button>
  </div>

  <div class="w-1/3  p-4 flex items-center justify-center text-orange-400">
    <button
      onClick={() => setSelectedType('Veg')}
      className="w-28 h-10 text-xl "
    >
      Veg
    </button>
  </div>

  <div class="w-1/3 p-4 flex items-center justify-center text-orange-400">
    <button
      onClick={() => setSelectedType('Non-Veg')}
      className="w-28 h-10 text-xl "
    >
      Non-Veg
    </button>
  </div>
</div>


      <div className="flex-grow ml-4">
  {loading ? (
    <Loading />
  ) : (
    <div className="px-6 pt-6 2xl:container mx-auto max-w-[your-width] flex flex-wrap gap-4 m-2">
      {filteredRestaurantProfiles.map((profile)  => (
        profile.is_registered ? ( // Check if is_registered is true
          <div
            key={profile.id}
            className="w-1/4 bg-white p-4 shadow-md rounded-lg " // Set width to 25% (1/4)
          >
           


            <div> <Card className="w-full max-w-[26rem] shadow-lg  border border-solid border-yellow-500 p-4 ">
      <CardHeader floated={false} color="blue-gray">
        <img
          src={profile.image}
          alt="ui/ux review check"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <IconButton
          size="sm"
          color="red"
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </IconButton>
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
          {profile.restaurant_name}
          </Typography>
          
        </div>
        <Typography color="gray">
        {profile.about}

        </Typography>
        <Typography color="gray">

        {profile.address}
        </Typography>
        
      </CardBody>
      <CardFooter className="pt-3">
      <Link to={`/Resmenu/${profile.restaurant}`}>
        <Button className=' border border-solid border-orange-500 bg-yellow-400 p-4' size="lg" fullWidth={true}>
          View
        </Button>
        </Link>
      </CardFooter>
    </Card>
              


              </div>
              



          </div>
        ) : null // Render nothing if is_registered is false
      ))}
    </div>
  )}
</div>
<Footer />



    </div>
  );
}


export default Home;
