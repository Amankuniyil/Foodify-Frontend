import React, { useState } from "react";
import api from '../../api/axiosConfig';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';

const AddAddress = () => {
  const [address, setAddress] = useState({
    address_line1: "",
    address_line2: "",
    state: "",
    city: "",
    pincode: "",
  });
  
  const user = useSelector(state => state.user);
  const userId = user.user_id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("orders/add-address/", address);
      if (response.status === 201) {
        // Address added successfully
        alert("Address added successfully!");
        // Reset the form
        setAddress({
          address_line1: "",
          address_line2: "",
          state: "",
          city: "",
          pincode: "",
        });
      }
    } catch (error) {
      // Handle error here
      console.error("Error adding address:", error);
    }
  };

  return (
<div>
<Navbar />
<br /><br />
<br />
      <h1 className="m-10">Add Address</h1>
      <form className="m-10 w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address-line1">
              Address Line 1:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-address-line1"
              type="text"
              name="address_line1"
              value={address.address_line1}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address-line2">
              Address Line 2:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-address-line2"
              type="text"
              name="address_line2"
              value={address.address_line2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              State:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
              City:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
              Pincode:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          className="mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          type="submit"
        >
          Add Address
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default AddAddress;
