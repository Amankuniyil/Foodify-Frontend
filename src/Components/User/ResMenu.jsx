import React, { useEffect, useState } from 'react';
import Navbar from '../Layout/Navbar';
import { Link, useParams, useHistory } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../Layout/Loading';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Layout/Footer';


import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  Typography,
  Button,
} from "@material-tailwind/react";

function ResMenu() {
  const [foodList, setFoodList] = useState([]);
  const user = useSelector((state) => state.user);
  const { profileId } = useParams();

  const id = parseInt(profileId, 10);


  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (foodId) => {
    setIsLoading(true);

    try {
      console.log('Sending request to add item to cart...');
      const response = await api.post(`cart/add/${foodId}/`);
      const { message, cart_item_id } = response.data;
      console.log('Item added to cart successfully!');
      console.log(`Cart Item ID: ${cart_item_id}`);
      toast.success(message);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Error adding item to cart.");
    } finally {
      setIsLoading(false);
    }
};



  useEffect(() => {
    async function fetchFoodData() {
      try {
        const response = await api.get(`menu/get-food/${profileId}`);
        setFoodList(response.data);
      } catch (error) {
        console.error('Error fetching food items', error);
      }
    }

    fetchFoodData();
  }, [profileId]);

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

  const [restaurantProfiles, setRestaurantProfiles] = useState([]);
  const [loading, setLoading] = useState(true);





  const renderFoodCard = (foodItem) => (
    <div key={foodItem.id} className="bg-white rounded-lg overflow-hidden shadow-md">
      {/* ...rest of your code for rendering the food card */}
      <button onClick={() => handleAddToCart(foodItem.id)} className="bg-yellow-400 text-white px-4 py-2 mt-2 m-4 rounded hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );

  return (
    
    <div>
      
      
      <Navbar />
      <br />

      <div>
        
      
       
      {/* <h2 className="text-3xl font-bold mb-4 text-center mx-auto">Restaurant</h2> */}
      {/* <section className="relative block h-80">
  <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")' }}>
    <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
  </div>
  <div className="bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-20" style={{ transform: 'translateZ(0px)' }}>
    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
      <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
    </svg>
  </div>
</section> */}

<div className="bg-gradient-to-b from-yellow-100 to-yellow-200">
<div className="m-4 p-4 ">


<div className="flex-grow ml-4">

  {loading ? (
    <Loading />
  ) : (
    <div className="px-6 pt-6 2xl:container mx-auto max-w flex flex-wrap gap-4">
      {restaurantProfiles.map((profile) => {
        if (profile.is_registered && profile.restaurant === id) {
          return (
            <div key={profile.id} className="flex items-center bg-white w-screen shadow-md">
              <div className="ml-4">
                <img
                  src={profile.image}
                  alt="Image"
                  className="m-8 6w-40 h-40" // Adjust the width and height as needed
                />
              </div>
              <CardBody>
              <div className=" w-100 h-40 ">
                <h2 className="text-3xl font-bold mb-2">{profile.restaurant_name}</h2>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">{profile.about}</h2>
                <h2 className="text-lg text-gray-500">{profile.address}</h2>
              </div>
              </CardBody>
            </div>
          );
        }
        return null;
      })}
    </div>
  )}
</div>



</div>

<h2 className="text-2xl font-bold mb-4 text-center mx-auto">Menu</h2>

      
      
<div className="flex space-x-4" style={{ justifyContent: 'center' }}>
  {foodList.map((foodItem) => (
    <div key={foodItem.id}>
      <Card className="w-96">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src={foodItem.image}
            alt="card-image"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{foodItem.name}</span>
            <span>₹ {foodItem.price}</span>
          </Typography>
          <Typography>
            {foodItem.description}
          </Typography>
        </CardBody>
        <button className='bg-gray-300'>{renderFoodCard(foodItem)}</button>
      </Card>
    </div>
  ))}
</div>
<br /><br />
<Footer />
</div>
</div>



    </div>
  );
}

export default ResMenu;
