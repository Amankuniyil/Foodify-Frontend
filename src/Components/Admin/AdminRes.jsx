import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import Loading from '../Layout/Loading';
import Sidebar from '../Layout/AdminSideBar';
import BlockUnblockModal from '../Layout/BlockUnblockModal'; // Adjust the path based on your project structure
import { useParams } from 'react-router-dom';

function AdminRes() {
  const { profileId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

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
      // Open the registration modal when clicking the button
      setIsRegistrationModalOpen(true);
    } catch (error) {
      console.error('Error updating registration status:', error);
    }
  };

  const closeRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
  };

  const confirmCancelRegistration = async () => {
    try {
      await api.put(`restaurant/update-registration-status/${profileId}/`, {
        is_registered: !restaurantDetails.is_registered, // Toggle the value
      });

      // Update the local state to reflect the change
      setRestaurantDetails((prevDetails) => ({
        ...prevDetails,
        is_registered: !prevDetails.is_registered,
      }));

      // Close the modal after successful action
      closeRegistrationModal();
    } catch (error) {
      console.error('Error updating registration status:', error);
    }
  };

  return (
    <div>
      <Sidebar />

      <div className="flex-grow">
        <p className='mb-3 text-center text-2xl underline mt-6'>Restaurant Details</p>
        {loading ? (
          // Loading component or placeholder
          <Loading />
        ) : (
          <div className="px-6 pt-6 ">
            <div className="relative  shadow-md sm:rounded-lg">
              <div className='ml-10 mt-5 mb-10'>
                <p className='mb-3 text-center text-2xl  mt-6'>{restaurantDetails.restaurant_name}</p>
                <p className="mb-2 text-xl">
                  User ID: {profileId} -{' '}
                  <button
                    onClick={handleRegister}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline md:ml-2"
                  >
                    {restaurantDetails.is_registered  ? 'Cancel Registration' : 'Register'}
                  </button>
                </p>

                <h2 className="text-2xl font-semibold mb-4">{restaurantDetails.restaurant}</h2>
                <p>{restaurantDetails.is_register ? 'Cancel Registration' : 'Register'}</p>
                <p className="mb-2 text-xl">Registered: {restaurantDetails.is_registered}</p>

                <p className="mb-2 text-xl">City: {restaurantDetails.city}</p>
                <p className="mb-2 text-xl">Year of Experience: {restaurantDetails.year_of_experience}</p>
                <p className="mb-2 text-xl">Registration Number: {restaurantDetails.registration_number}</p>
                <p className="mb-2 text-xl">About: {restaurantDetails.about}</p>
                <p className="mb-2 text-xl">Address: {restaurantDetails.address}</p>
                <p className="mb-2 text-xl">City: {restaurantDetails.city}</p>
              </div>
              <div className="-m-1 flex flex-wrap md:-m-2 ">
                {/* ... existing code ... */}
              </div>
            </div>
            <br /><br />
            <div>
            <div className="-m-1 flex flex-wrap md:-m-2 text-center">
        <div className="flex w-1/2 md:w-1/3 lg:w-1/4">
          <div className="w-full p-1 md:p-2">
            <p className='mb-10 text-xl'>Image </p>
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={restaurantDetails.image}
            />
          </div>
        </div>
        <div className="flex w-1/2 md:w-1/3 lg:w-1/4 ">
          <div className="w-full p-1 md:p-2">
            <p className='mb-10 text-xl'>FSSAI</p>
            <img
              alt="gallery"
              src={restaurantDetails.fssai}
              className="block h-full w-full rounded-lg object-cover object-center"
            />
          </div>
        </div>
        <div className="flex w-1/2 md:w-1/3 lg:w-1/4 ">
          <div className="w-full p-1 md:p-2">
            <p className='mb-10 text-xl'> License</p>
            <img
              alt="gallery"
              src={restaurantDetails.license}
              className="block h-full w-full rounded-lg object-cover object-center"
            />
          </div>
        </div>
        <div className="flex w-1/2 md:w-1/3 lg:w-1/4 ">
          <div className="w-full p-1 md:p-2">
            <p className='mb-10 text-xl'>Profile Photo</p>
            <img
              alt="gallery"
              src={restaurantDetails.profile_photo}
              className="block h-full w-full rounded-lg object-cover object-center"
            />
          </div>
        </div>
      </div>


            </div>

            {/* Registration Modal */}
            <BlockUnblockModal
              isOpen={isRegistrationModalOpen}
              onRequestClose={closeRegistrationModal}
              onConfirm={confirmCancelRegistration}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminRes;
