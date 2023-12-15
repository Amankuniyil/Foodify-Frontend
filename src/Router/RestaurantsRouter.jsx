import React from 'react'
import { Routes, Route, Router } from 'react-router-dom'
import App from '../Components/Restaurants/AddFood'
import RestaurantRegister from '../Components/Restaurants/RestaurantRegister'
import RestaurantHome from '../Components/Restaurants/RestaurantHome'
import OrderDetail from '../Components/Restaurants/OrderDetail'
import ResChart from '../Components/Layout/ResChart'
import ResProfile from '../Components/Restaurants/ResProfile'
import CancelOrder from '../Components/Restaurants/CancelOrder'
import ResChat from '../Components/Restaurants/ResChat'
import Notify from '../Components/Restaurants/Notify'

import ResOrder from '../Components/Restaurants/ResOrder'
import Menu from '../Components/Restaurants/Menu'
import Pending from '../Components/Restaurants/Pending'


function RestaurantRouter() {
  return (
    <Routes>

        <Route path="/register" element={<RestaurantRegister />} />
        <Route path="/notify" element={<Notify />} />
        <Route path="/resorders" element={<ResOrder />} />
        <Route path="/orderdetail/:orderId" element={<OrderDetail />} />
        <Route path="/cancel/:orderId" element={<CancelOrder />} />
        <Route path="/" element={<RestaurantHome />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reschart" element={<ResChart />} />
        <Route path="/resprofile" element={<ResProfile />} />

        <Route path="/reschat/:profileId" element={<ResChat />} />
        

        { <Route path="/addfood" element={<App />} /> }
     
        

    </Routes>
  )
}

export default RestaurantRouter