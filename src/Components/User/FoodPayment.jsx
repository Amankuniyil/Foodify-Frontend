import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { useSelector } from 'react-redux';
import Razorpay from 'react-razorpay';
import SubTotal from '../Layout/SubTotal';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';

function FoodPayment() {
    const user = useSelector((state) => state.user);
    const { orderId } = useParams(); // Receive the order ID from URL parameters
    const [orderData, setOrderData] = useState({});
    const [orderTotal, setOrderTotal] = useState(0);
    const [orderResponse, setOrderResponse] = useState(null);
    

    useEffect(() => {
        async function fetchOrderDetails() {
            try {
                // Fetch order details from the backend based on the provided order ID
                const response = await api.get(`orders/order-view/${orderId}`);
    
                if (response.data) {
                    const orderData = response.data;
                    setOrderData(orderData);
                    setOrderTotal(orderData.order_total);
                }
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        }
    
        fetchOrderDetails();
    }, [orderId]);

    const initiateFoodPayment = async () => {
        try {
            const response = await api.post('orders/initiate-payment/', {
                order_number: orderId,         // Use order_number instead of order_id
                order_total: orderTotal,       // Use order_total instead of deposit_amount
            });
            console.log("gg:",response.data.order_response)
            console.log('Payment:', response.data.order_response.id);
            console.log('p:',response.status)
    
            setOrderResponse(response.data.order_response);
            if(response.status==200){
                initPayment(response.data.order_response)
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };



    const initPayment =(order)=>{

        console.log(order.id)
        console.log(order.id)
        console.log(order.amount)
        var options={
            key:"rzp_test_bSa79V3eWORvIC",
            currency:"INR",
            name:"foodify",
            description:"for testing",
            amount:order.amount,
            order_id:order.id,
            handler:function(response){
                createOrder(response)
            },
            theme:{
                color:"#3399cc"
            },
        }
        var pay= new window.Razorpay(options)
        pay.open()
    }






    // const handleFoodPaymentSuccess = (paymentData) => {
    //     try {
    //         const requestData = {
    //             razorpay_order_id: paymentData.razorpay_order_id,
    //         };

    //         api.post('/orders/success-payment/', requestData)
    //             .then((response) => {
    //                 if (response.status === 200) {
    //                     window.location.href = 'http://127.0.0.1:8000/orders/success-payment/';
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error('Error processing payment:', error);
    //             });
    //     } catch (error) {
    //         console.error('Error processing payment:', error);
    //     }
    // }


    const createOrder=async(data)=>{
            try{
            const requestData = {
                razorpay_order_id: data.razorpay_order_id,
             
            };
            const response = await api.post('/orders/success-payment/',{data
    
            })
            console.log("Response from backend:", response.data);
            console.log("pa:",data)
            if (response.status === 200) {
                window.location.href = '/payment/success/';
            }
            }catch (error) {
                console.error('Error creating booking:', error);
            }  
        
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-2 bg-gradient-to-b from-yellow-200 to-yellow-300">
            <Navbar />
            <br /><br /><br />

            <div className="w-full md:w-2/3 lg:w-1/2 xl:w-2/3 p-6 border rounded-lg bg-white m-20">
                
                <h1 className="text-2xl font-bold">Checkout</h1>
                <p>Order ID:{orderId}</p>
               
                <SubTotal />

                {Object.keys(orderData).length > 0 && (
                    <div className="bg-white border rounded p-4">
                        <div className="mt-4 text-bold">
                            <p>Order Total: ₹{orderTotal}</p>
                        </div>

                        {orderResponse ? (
                            <Razorpay
                                order_id={orderResponse.id}
                                currency="INR"
                                amount={orderResponse.amount}
                                name="EliteFood"
                                description="for testing"
                                handler={createOrder}
                                theme={{
                                    color: "#3399cc",
                                }}
                            >
                                <button className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Pay Now
                                </button>
                            </Razorpay>
                        ) : (
                            <button
                                className="bg-yellow-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={initiateFoodPayment}
                            >
                                Initiate Payment
                            </button>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default FoodPayment;
