import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import Loading from '../Layout/Loading';
import Sidebar from '../Layout/AdminSideBar';
import { Link } from 'react-router-dom';

function AdminResManagement() {
  const [restaurantProfiles, setRestaurantProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptedRestaurant, setAcceptedRestaurant] = useState([]);

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

  const handleAcceptRestaurant = (restaurantId) => {
    const endpoint = `admin/register-restaurant/${restaurantId}/`;

    api
      .post(endpoint)
      .then((response) => {
        console.log('Restaurant registration response:', response);

        setAcceptedRestaurant((prevAcceptedRestaurant) => [
          ...prevAcceptedRestaurant,
          restaurantId,
        ]);
      })
      .catch((error) => {
        console.error('Error registering restaurant:', error);
      });
  };

  const handleBlockUnblock = async (userId) => {
     {
      // const response = await api.put(`admin/blockuser/${userId}/`);
      const response = await api.put(`accounts/user/${userId}/`);
  
    //   if (response.status === 200) {
    //     const updatedUserList = userProfiles.map((profile) =>
    //       profile.user.id === userId
    //         ? { ...profile, user: { ...profile.user, is_active: !blockAction } }
    //         : profile
    //     );
  
    //   //   setUserProfiles(updatedUserList);
    //   //   closeUserModal();
    //   //   setBlockAction(!blockAction);
    //   // }
  
    //   console.log('Block/Unblock response:', response);
    // } 
    }
  };
  

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-grow ml-4">
        {loading ? (
          <Loading />
        ) : (
          <div className="px-6 pt-6 2xl:container mx-auto max-w-[your-width] overflow-x-auto">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-black dark:bg-black dark:text-white">
                  <tr>
                    <th className="px-3 py-2 md:px-6 md:py-4">Restaurant</th>
                    <th className="px-3 py-2 md:px-6 md:py-4">City</th>
                    <th className="px-3 py-2 md:px-6 md:py-4">Year of Experience</th>
                    <th className="px-3 py-2 md:px-6 md:py-4">Registration</th>
                    <th className="px-3 py-2 md:px-6 md:py-4">About</th>
                    <th className="px-3 py-2 md:px-6 md:py-4">Registered</th>
                    {/* <th className="px-3 py-2 md:px-6 md:py-4">Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {restaurantProfiles.map((profile) => (
                    <tr key={profile.id} className="bg-white border-b font-semibold text-black">
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.restaurant_name}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.city}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.year_of_experience}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.registration_number}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.about} {profile.id}
                      </td>
  
                      <td className="px-3 py-2 md:px-6 md:py-4">
                      <Link to={`/admin/restaurant-details/${profile.id}`}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                          Details
                        </button>
                      </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminResManagement;
