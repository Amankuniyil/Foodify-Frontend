import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import Loading from '../Layout/Loading';
import Sidebar from '../Layout/AdminSideBar';
import { Link, useParams } from 'react-router-dom';

function AdminRes() {
  const { profileId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRestaurantDetails() {
      try {
        const response = await api.get(`restaurant/get-restaurant-profile/${profileId}/`);
        setRestaurantDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
        setLoading(false);
      }
    }

    fetchRestaurantDetails();
  }, [profileId]);


  const handleRegister = async (profileId) => {
    try {
      await api.put(`restaurant/update-registration-status/${profileId}/`, {
        is_register: !restaurantDetails.is_register, // Toggle the value
      });

      // Update the local state to reflect the change
      setRestaurantDetails((prevDetails) => ({
        ...prevDetails,
        is_register: !prevDetails.is_register,
      }));
    } catch (error) {
      console.error('Error updating registration status:', error);
    }
  };

  

  return (
    <div className="flex-grow">
      {loading ? (
        // Loading component or placeholder
        <Loading />
      ) : (
        <div className="px-6 pt-6 ">
          <div className="relative  shadow-md sm:rounded-lg">
            <div className='ml-10 mt-5 mb-10'>
            <p className="mb-2 text-xl">User ID: {profileId} -  <button
              onClick={() => handleRegister(profileId)}
              className="font-medium text-blue-600  dark:text-blue-500 hover:underline md:ml-2"
            >
              {restaurantDetails.is_registered ? 'Unblock' : 'Block'}
            </button></p>

            <h2 className="text-2xl font-semibold mb-4">{restaurantDetails.restaurant}</h2>
            <p className="mb-2 text-xl">City: {restaurantDetails.city}</p>
            <p className="mb-2 text-xl">Year of Experience: {restaurantDetails.year_of_experience}</p>
            <p className="mb-2 text-xl">Registration Number: {restaurantDetails.registration_number}</p>
            <p className="mb-2 text-xl">About: {restaurantDetails.about}</p>
            <p className="mb-2 text-xl">Address: {restaurantDetails.address}</p>
            <p className="mb-2 text-xl">City: {restaurantDetails.city}</p>
            </div>
            <div className="-m-1 flex flex-wrap md:-m-2 ">
        <div className="flex w-1/2 md:w-1/3 lg:w-1/4">
          <div className="w-full p-1 md:p-2">
            <p className='mb-10 text-xl'>Image</p>
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={process.env.REACT_APP_API_BASE_URL + restaurantDetails.image}
            />
          </div>
        </div>
        <div className="flex w-1/2 md:w-1/3 lg:w-1/4 ">
          <div className="w-full p-1 md:p-2">
            <p className='mb-10 text-xl'>FSSAI</p>
            <img
              alt="gallery"
              src={process.env.REACT_APP_API_BASE_URL + restaurantDetails.fssai}
              className="block h-full w-full rounded-lg object-cover object-center"
            />
          </div>
        </div>
        <div className="flex w-1/2 md:w-1/3 lg:w-1/4 ">
          <div className="w-full p-1 md:p-2">
            <p className='mb-10 text-xl'> License</p>
            <img
              alt="gallery"
              src={process.env.REACT_APP_API_BASE_URL + restaurantDetails.license}
              className="block h-full w-full rounded-lg object-cover object-center"
            />
          </div>
        </div>
        <div className="flex w-1/2 md:w-1/3 lg:w-1/4 ">
          <div className="w-full p-1 md:p-2">
            <p className='mb-10 text-xl'>Profile Photo</p>
            <img
              alt="gallery"
              src={process.env.REACT_APP_API_BASE_URL + restaurantDetails.profile_photo}
              className="block h-full w-full rounded-lg object-cover object-center"
            />
          </div>
        </div>
      </div>
            <button
              onClick={() => handleRegister(profileId)}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline md:ml-2"
            >
              {restaurantDetails.is_registered ? 'Unblock' : 'Block'}
            </button>
            {/* Add more details as needed */}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRes;