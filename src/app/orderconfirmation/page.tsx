"use client"

import React, { useEffect, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderConfirmationProps {
  orderId: string; // Pass the order ID to fetch order details
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState<any>(null); // Store order details
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/order/${orderId}`);
        const data = await response.json();
        setOrderDetails(data.order);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderDetails) {
    return <div>Order not found</div>;
  }

  return (
    <div className="p-6 bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Customer Details</h3>
        <p><strong>Name:</strong> {orderDetails.name}</p>
        <p><strong>Email:</strong> {orderDetails.email}</p>
        <p><strong>Address:</strong> {orderDetails.address}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Order Details</h3>
        <ul>
          {orderDetails.cartItems.map((item: CartItem, index: number) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <div className="flex flex-col">
                <span><strong>Item:</strong> {item.name}</span>
                <span><strong>Quantity:</strong> {item.quantity}</span>
                <span><strong>Price:</strong> ${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Total Price</h3>
        <p className="text-lg font-bold">
          $
          {orderDetails.cartItems.reduce(
            (total: number, item: CartItem) => total + item.price * item.quantity,
            0
          ).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
