import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import api from '../../api/axiosConfig';
const Notify = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const Resid=3

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get('restaurant/getprofile/'); // Replace with the actual API endpoint for order items
        // setOrderItems(response.data);
      } catch (error) {
        console.error('Error fetching order items', error);
        // You can set an error state here if needed
      }
    }

    fetchUser();
  }, []); // Fetch order items whenever the order ID changes


  useEffect(() => {
    // setup chat socket
    // const notifySocket = new WebSocket(`ws://127.0.0.1:8000/ws/notify/${Resid}/`);
    // const notifySocket = new WebSocket(`wss://127.0.0.1:8000/ws/notify/${Resid}/`);

    // const notifySocket = new WebSocket(`ws://foodify-frontend-five.vercel.app/ws/notify/${Resid}/`);
    const notifySocket = new WebSocket(`wss://foodify-frontend-five.vercel.app/ws/notify/${Resid}/`);


    

    //  on socket open
    notifySocket.onopen = () => {
      console.log('Socket successfully connected.');
    };

    // on socket close
    notifySocket.onclose = () => {
      console.log('Socket closed unexpectedly');
    };

    // on receiving message on group
    notifySocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const message = data.message;
      toast.success('order recieved successfully');

      // Update notifications and count
      setNotifications((prevNotifications) => [...prevNotifications, message]);
      setNotificationCount((prevCount) => prevCount + 1);
    };

    // Cleanup WebSocket on component unmount
    return () => notifySocket.close();
  }, []);

  return (
    <>
   
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      </nav>

      {/* Content */}
      <div className="container mt-5">
      
      </div>
    </>
  );
};

export default Notify;
