import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import { Link } from 'react-router-dom';
import Address from './Address';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import SubTotal from '../Layout/SubTotal';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';



function Order() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const userId = user.user_id;
  const navigate = useNavigate();


  




  const [orderTotal, setOrderTotal] = useState(0);

  function handleTotalChange(total) {
    setOrderTotal(total);
  }

  


  async function createOrder() {
    try {
      const data = {
        user: user.user_id,
        address: selectedAddress,
        order_total:orderTotal,
      };

      const response = await api.post('http://127.0.0.1:8000/orders/create/', data);
      const orderId = response.data.orderId;
      console.log('orderId:',orderId);

      navigate(`/payment/${orderId}`);
    } catch (error) {
      
      console.error('Error creating order', error);
    }
  }

  function handleSelectAddress(addressId) {
    setSelectedAddress(addressId);
  }
  
  useEffect(() => {
    async function fetchCartItems() {
      setIsLoading(true);
      try {
        const response = await api.get('http://127.0.0.1:8000/cart/items');
        setCartItems(response.data.cart_items);
      } catch (error) {
        console.error('Error fetching cart items', error);
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchUserAddresses() {
      try {
        const response = await api.get(`http://127.0.0.1:8000/orders/get-addresses/?user=${userId}`);
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses', error);
      }
    }

    fetchCartItems();
    fetchUserAddresses();
  }, []);

  // function calculateTotalPrice() {
  //   let totalPrice = 0;
  //   cartItems.forEach((cartItem) => {
  //     totalPrice += cartItem.quantity * cartItem.price;
  //   });
  //   return totalPrice;




  // }





    useEffect(() => {
        async function fetchCartItems() {
          setIsLoading(true);
          try {
            const response = await api.get('cart/items');
            setCartItems(response.data.cart_items);
          } catch (error) {
            console.error('Error fetching cart items', error);
          } finally {
            setIsLoading(false);
          }
        }
    
        fetchCartItems();
      }, []);




      const AddressList = ({ addresses, selectedAddress, onSelectAddress }) => {
        return (
          <div>
            <h1 className="text-2xl text-yellow-500 font-semibold mb-4">Your Addresses</h1>
            {addresses.length === 0 ? (
              <div>
                <p className='text-red-400 text-xl'> No Address Available</p>
            
              <Link to="/add-address">
               
                
              <button className="p-4 rounded-lg bg-green-400 text-white px-4 py-2 m-10"> Add New Address</button>
            </Link>

            </div>

              
            ) : (
              addresses.map((address, index) => (
                <div key={index} className="mb-4 border p-4 rounded-lg">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={() => onSelectAddress(address.id)}
                      className="mr-2"
                    />
                    <div>
                      <div className="font-semibold">{address.address_line1}</div>
                      {address.address_line2 && <div>{address.address_line2}</div>}
                      <div>{address.city}, {address.state} - {address.pincode}</div>
                    </div>
                  </label>
                </div>
              ))
            )}
          </div>
        );
      };
      

  return (
    
    <div>
      <div><Navbar /><br /><br /></div>
    
    <div className="flex justify-center items-center h-screen  bg-gradient-to-b from-yellow-100 to-yellow-200">
      
      

       
      <div className="w-2/3 p-6 border rounded-lg mb-5 bg-white">
      
        <h2 className="text-3xl font-bold text-yellow-500">Order Details</h2>
        <AddressList
          addresses={addresses}
          selectedAddress={selectedAddress}
          onSelectAddress={handleSelectAddress}
        />
        {isLoading ? (
          <p>Loading cart items...</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <SubTotal />
     
            <Link to="/payment">
              <button
                className="bg-yellow-400 text-white px-4 py-2 mt-4 p-4 rounded-lg"
                onClick={createOrder}
              >
                Proceed to Payment
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Order;


const AddressList = ({ addresses, selectedAddress, onSelectAddress }) => {
  return (
    <div>
      <h1 className="text-2xl text-yellow-500 font-semibold mb-4">Your Addresses</h1>
      {addresses.length === 0 ? (
        <p>No addresses available. Please add an address.</p>
      ) : (
        addresses.map((address, index) => (
          <div key={index} className="mb-4 border p-4 rounded-lg">
            <label className="flex items-center">
              <input
                type="radio"
                name="address"
                value={address.id}
                checked={selectedAddress === address.id}
                onChange={() => onSelectAddress(address.id)}
                className="mr-2"
              />
              <div>
                <div className="font-semibold">{address.address_line1}</div>
                {address.address_line2 && <div>{address.address_line2}</div>}
                <div>{address.city}, {address.state} - {address.pincode}</div>
              </div>
            </label>
          </div>
        ))
      )}
    </div>
  );
};