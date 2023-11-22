
import MyChart from '../Layout/MyChart';
import AdminResBar from '../Layout/AdminResBar';
import api from '../../api/axiosConfig';
import Sidebar from '../Layout/AdminSideBar';
import React, { useState, useEffect } from 'react';
import ResChart from '../Layout/ResChart';


function AdminDashboard() {

    const [isLoading, setIsLoading] = useState(true);
    const [restaurantProfileId, setRestaurantProfileId] = useState(null);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurantOrders = async () => {
          setIsLoading(true);
    
          try {
            const accessToken = 'your_access_token'; // Replace with your actual access token
    
            const response = await api.get('orders/all-orders/', {
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
  return (
    <div>
      <div>
       <Sidebar />
       </div>

<main>
            <div class="">
           
               <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                  <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                     <div class="flex items-center justify-between mb-4">
                        <div class="flex-shrink-0">
                           <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">$45,385</span>
                           <h3 class="text-base font-normal text-gray-500">Sales this week</h3>
                        </div>
                        <div class="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                           12.5%
                           <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                           </svg>
                        </div>
                     </div>
                     <div id="main-chart"> <MyChart /></div>
                  </div>
                  <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                     <div class="mb-4 flex items-center justify-between">
                        <div>
                           <h3 class="text-xl font-bold text-gray-900 mb-2">Latest Transactions</h3>
                           <span class="text-base font-normal text-gray-500">This is a list of latest transactions</span>
                        </div>
                        <div class="flex-shrink-0">
                        
                        </div>
                     </div>
                     <div class="flex flex-col mt-8">
                        <div class="overflow-x-auto rounded-lg">
                           
                           <div class="align-middle inline-block min-w-full">
                              <div class="shadow overflow-hidden sm:rounded-lg">
                              <div className="flex items-center">
  <table className="min-w-full bg-white border border-gray-300">
    <thead>
      <tr>
        <th className="border border-gray-300 py-2 px-4">Order ID</th>
        <th className="border border-gray-300 py-2 px-4">Customer Name</th>
        
        <th className="border border-gray-300 py-2 px-4">Amount Paid</th>
       
      </tr>
    </thead>
    <tbody>
      {orders.slice(0, 10).map((order) => (
        <tr key={order.id}>
          <td className="border border-gray-300 py-2 px-4">{order.id}</td>
          <td className="border border-gray-300 py-2 px-4">{`${order.user.first_name} ${order.user.last_name}`}</td>
        
          <td className="border border-gray-300 py-2 px-4"> {order.order_total} ₹ </td>
       
        </tr>
      ))}
    </tbody>
  </table>
</div>

                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <br /> <br />
               <div className="flex items-center">
               <table className="min-w-full bg-white border border-gray-300">
  <thead>
    <tr>
      <th className="border border-gray-300 py-2 px-4">Order ID</th>
      <th className="border border-gray-300 py-2 px-4">Customer Name</th>
      <th className="border border-gray-300 py-2 px-4">Phone Number</th>
      <th className="border border-gray-300 py-2 px-4">Email</th>
      <th className="border border-gray-300 py-2 px-4">Order Status</th>
    </tr>
  </thead>
  <tbody>
    {orders.slice(0, 10).map((order) => (
      <tr key={order.id}>
        <td className="border border-gray-300 py-2 px-4">{order.id}</td>
        <td className="border border-gray-300 py-2 px-4">{`${order.user.first_name} ${order.user.last_name}`}</td>
        <td className="border border-gray-300 py-2 px-4">{order.user.phone_number}</td>
        <td className="border border-gray-300 py-2 px-4">{order.user.email}</td>
        <td className="border border-gray-300 py-2 px-4">
          <button className="hover:bg-blue-700 font-bold py-2 px-4 rounded-full">
            {`${order.status} - ${order.user.first_name}`}
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

</div>
<div id="main-chart"> <AdminResBar /></div>























            
            </div>
         </main>
    
  </div>


        )
}

export default AdminDashboard


