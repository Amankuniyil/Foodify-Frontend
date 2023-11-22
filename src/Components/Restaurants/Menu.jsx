import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResFooter from '../Layout/ResFooter';
import ResSideBar from '../Layout/ResSideBar';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import Loading from '../Layout/Loading';
import api from '../../api/axiosConfig';

function Menu() {
  const [foodList, setFoodList] = useState([]);
  const user = useSelector((state) => state.user);
  const { profileId } = useParams();
  const id = parseInt(profileId, 10);
  const [isLoading, setIsLoading] = useState(false);
  const [restaurantProfiles, setRestaurantProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFoodData = async () => {
    try {
      const response = await api.get('menu/get-food/');
      setFoodList(response.data);
    } catch (error) {
      console.error('Error fetching food items', error);
    }
  };



  









  const fetchData = async () => {
    try {
      const response = await api.get('restaurant/restaurant-profiles/');
      setRestaurantProfiles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching restaurant profiles:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (foodItemId) => {
    try {
      await api.delete(`menu/delete-food/${foodItemId}`);
      setFoodList(foodList.filter(item => item.id !== foodItemId));
      toast.success('Food item deleted successfully');
    } catch (error) {
      console.error('Error deleting food item', error);
      toast.error('Failed to delete food item');
    }
  };

  const handleToggleAvailability = async (foodItemId) => {
    try {
      const response = await api.put(`menu/toggle-availability/${foodItemId}/`);
      if (response.status === 200) {
        const updatedFoodList = foodList.map((foodItem) => {
          if (foodItem.id === foodItemId) {
            return {
              ...foodItem,
              is_available: !foodItem.is_available,
            };
          }
          return foodItem;
        });
        setFoodList(updatedFoodList);
      }
    } catch (error) {
      console.error('Error toggling availability', error);
      toast.error('Failed to toggle availability');
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, [profileId]);

  useEffect(() => {
    fetchData();
  }, []);

  const renderFoodCard = (foodItem) => (
    <Button
      color='blue'
      onClick={() => handleDelete(foodItem.id)}
      className='my-2 mr-10 bg-red-500'
    >
      Delete
    </Button>
  );

  return (
    <div>
    <div className='flex'>
      <ResSideBar />
      <div className='flex flex-col flex-grow'>
        <div className='px-6 pt-6'>
          <h2 className='text-3xl font-bold mb-4'>Restaurant</h2>
          <div className='flex flex-wrap gap-4 '>
            {loading ? (
              <Loading />
            ) : (
              restaurantProfiles
                .filter((profile) => profile.is_registered && profile.restaurant === id)
                .map((profile) => (
                  <Card
                    key={profile.id}
                    color='white'
                    className='w-1/4 p-4 shadow-md rounded-lg'
                  >
                    <p>{profile.restaurant_name}</p>
                    <p>{profileId}</p>
                    <p>{profile.restaurant}</p>
                  </Card>
                ))
            )}
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 m-10'>
          {foodList.map((foodItem) => (
            <Card key={foodItem.id} className='w-96'>
              <CardHeader color='blue-gray' className='relative h-56'>
                <img
                  src={foodItem.image}
                  alt='card-image'
                />
              </CardHeader>
              <CardBody>
                <div className='mb-2'>
                  <span className='text-xl font-bold'>{foodItem.name}</span>
                  <span className='ml-2 text-xl font-bold'>₹ {foodItem.price}</span>
                </div>
                <p>{foodItem.description}</p>
                {foodItem.is_available ? (
                  <p className='text-green-500 text-xl '>Available</p>
                ) : (
                  <p className='text-red-500 text-xl'>Not Available</p>
                )}
              </CardBody>
              <CardFooter className='pt-0'>
                {renderFoodCard(foodItem)}
                <Button
                  onClick={() => handleToggleAvailability(foodItem.id)}
                  color='yellow'
                  className='my-2 text-white'
                >
                  Toggle Availability
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

    </div>

    <ResFooter/>


    </div>
  );
}

export default Menu;
