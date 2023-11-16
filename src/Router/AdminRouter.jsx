import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../Components/Admin/AdminDashboard'
import AdminUserManagement from '../Components/Admin/AdminUserManagement'
import AdminResManagement from '../Components/Admin/AdminResManagement'
import AdminOrders from '../Components/Admin/AdminOrders'
import MyChart from '../Components/Layout/MyChart'

import AdminRes from '../Components/Admin/AdminRes'


function AdminRouter() {
  return (
    <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/users" element={<AdminUserManagement />} />
        <Route path="/orders" element={<AdminOrders />} />
        <Route path="/restaurants" element={<AdminResManagement />} />
        <Route path="/chart" element={<MyChart />} />
        <Route path="/restaurant-details/:profileId" element={<AdminRes /> } />


    </Routes>
  )
}

export default AdminRouter