// UserProfile.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../api/axiosConfig';

import ResSideBar from '../Layout/ResSideBar';
import Address from '../User/Address';
import { Link } from 'react-router-dom';
import Footer from '../Layout/Footer';
import ResFooter from '../Layout/ResFooter';

function ResProfile() {
  const [profileData, setProfileData] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const authToken = useSelector((state) => state.accessToken);
  const user = useSelector((state) => state.user);

  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [loading, setLoading] = useState(true);











  useEffect(() => {
    api
      .get("restaurant/get-res-profile/")
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateProfileDataInParent = (newProfileData) => {
    setProfileData(newProfileData);
    closeModal(); // Close the modal after successful update
  };

  return (
    <div>
      <ResSideBar />
      <div className="h-full p-8">
        {profileData && (
          <>
            <div className="flex items-center justify-center">
              <h1>Welcome!..</h1>
            </div>

            <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
              <div className="w-full flex flex-col 2xl:w-1/3">
                <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                  <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
                  <ul className="mt-2 text-gray-700">
                    <li className="flex border-y py-2">
                      <span className="font-bold w-24">Full name:</span>
                      <span className="text-gray-700">
                        {user.first_name} {user.last_name}
                      </span>
                    </li>

                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Mobile:</span>
                      <span className="text-gray-700">{user.phone_number}</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Email:</span>
                      <span className="text-gray-700">{user.email}</span>
                    </li>

                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Username:</span>
                      <span className="text-gray-700">{user.username}</span>
                    </li>
                    <li className="flex border-b py-2">
                      <button onClick={openModal}>Edit Profile</button>
                    </li>
                  </ul>
                </div>
                
                
              </div>


              
            </div>
          </>
        )}
      </div>
      <ResFooter/>
     
      
     

   
    </div>
  );
}

export default ResProfile;
