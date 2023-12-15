// RazorpayComponent.js
import React from 'react';
import Razorpay from 'react-razorpay';

const RazorpayComponent = () => {
  const options = {
    key: 'YOUR_RAZORPAY_KEY_ID',
    amount: 10000, // amount in paisa (10000 paisa = ₹100)
    currency: 'INR',
    name: 'Your Company Name',
    description: 'Test payment',
    image: 'https://your-company-logo.png',
    order_id: 'order_123xyz', // Generate this server-side and pass it here
    handler: function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
    prefill: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      contact: '9876543210',
    },
    notes: {
      address: 'Razorpay Corporate Office',
    },
  };

  return <Razorpay options={options} />;
};

export default RazorpayComponent;
