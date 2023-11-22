import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarRes from '../Layout/NavbarRes';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../Layout/Loading';
import ResFooter from '../Layout/ResFooter';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axiosConfig';
import ResSideBar from '../Layout/ResSideBar';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Razorpay from 'react-razorpay';

function ResOrder() {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantProfileId, setRestaurantProfileId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const statusOptions = ['Order Confirmed', 'Cooking', 'Out for delivery', 'Delivered'];

  const handleChangeOrderStatus = async (orderId) => {
    setIsLoading(true);

    try {
      console.log('Sending request to change order status...');

      // Find the current status of the order
      const order = orders.find((order) => order.id === orderId);

      if (!order) {
        toast.error('Order not found.');
        return;
      }

      // Find the index of the current status in the predefined status options
      const currentIndex = statusOptions.indexOf(order.status);

      if (currentIndex === -1 || currentIndex === statusOptions.length - 1) {
        toast.error('Invalid status or order is already delivered.');
        return;
      }

      // Get the next status based on the index
      const newStatus = statusOptions[currentIndex + 1];

      // Perform your status change logic here
      const response = await api.post(`orders/change-order-status/${orderId}/`, {
        newStatus: newStatus,
      });

      // Update the order status in the state
      const updatedOrders = orders.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      );
      setOrders(updatedOrders);

      toast.success('Order status changed successfully to ' + newStatus);
    } catch (error) {
      console.error('Error changing order status:', error);
      toast.error('Error changing order status.');
    } finally {
      setIsLoading(false);
    }
  };



  const user = useSelector((state) => state.user);
  const { orderId } = useParams(); // Receive the order ID from URL parameters

  const [orderResponse, setOrderResponse] = useState(null);
  







  useEffect(() => {
    const fetchRestaurantOrders = async () => {
      setIsLoading(true);

      try {
        const accessToken = 'your_access_token'; // Replace with your actual access token

        const response = await api.get('orders/resorders/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setRestaurantProfileId(response.data.restaurant_profile_id);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching restaurant orders', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurantOrders();
  }, []);

  // const cancelOrder = async (orderId) => {
  //   try {
  //     const response = await api.post(`orders/cancel/${orderId}/`);
  //     console.log(response.data);
  //     // Refresh the order details or redirect to the orders page
  //   } catch (error) {
  //     console.error('Error cancelling order:', error);
  //   }
  // };


  const navigateToCancelPage = (orderId) => {
    // Navigate to the new page with the order ID as a parameter
    navigate(`/Restaurant/cancel/${orderId}`);
  };






// Your React component

const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
const host = window.location.host;
const path = '/restaurant/';

const socket = new WebSocket(`${protocol}${host}${path}`);

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('WebSocket message received:', data.message);
    // Handle the WebSocket message as needed in your React component
};



// const socket = new WebSocket(`ws://localhost:8000/ws/order/${order.id}/restaurant/${restaurant.id}/`);

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('WebSocket message received:', data.message);
    // Handle the WebSocket message as needed in your React component
};



  return (
    <div>
        <ResSideBar />
      <br /><br /><br />
      <h1 className="mb-10 text-center text-blue-900 text-2xl font-bold">Restaurant Orders</h1>

      {isLoading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}






      <ul className="flex justify-center flex-wrap">
        {orders.map((order) => (
          <li key={order.id} className="m-4">
            <div className="h-full rounded-lg border bg-white p-6 shadow-md w-96">
              <h5 className="mb-4 text-center text-xl font-semibold">Order -{order.id}</h5>
              <div className="mb-2">
                
                <p className="text-gray-700 text-lg">
                  {order.user.first_name} {order.user.last_name}-{order.user.phone_number}
                </p>
                <br />
                <p className="text-gray-700">
                  {order.user.email} 
                </p>
                <br />
                <p className="text-gray-700">
                  {order.address.address_line1}-{order.address.address_line2}
                </p>
                <br />
                <p className="text-gray-700">
                 {order.address.city}--{order.address.pincode}
                </p>
                <br />
              </div>



              <div>
              <div className="flex justify-between">
                <p className="text-gray-700">Order-status</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  <p className="text-gray-700">
                    {order.status}-{order.user.first_name}
                  </p>
                </button>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div>
                  <p className="mb-1 text-lg font-bold">{order.order_total}</p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button
                className="mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => handleChangeOrderStatus(order.id)}
              >
                Change Status
              </button>
              <Link to={`/orderdetail/${order.id}`}>
                <button
                  className="mt-4 w-40 ml-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  View Details
                </button>
              </Link>


              

                {order.status !== 'Cancelled' && (
                  <button
                    className="mt-4 w-80 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                    onClick={() => navigateToCancelPage(order.id)}
                  >
                    Cancel Order
                  </button>
                )}
            </div>
           
              
            </div>
          </li>
        ))}
      </ul>

      <ResFooter/>






    </div>
  );
}

export default ResOrder;
