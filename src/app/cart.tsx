"use client"

import React, { useState, useEffect } from "react";
import { useCart } from "./context";
import CheckoutForm from "./CheckoutForm";

export const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, deleteItem } = useCart();
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState<boolean>(false); // Track checkout form visibility
  const [orderDetails, setOrderDetails] = useState<any>(null); // New state for order details
  const [isMobile, setIsMobile] = useState<boolean>(false); // Track if the screen is mobile

  // Detect screen size for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this width as needed for mobile
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    setIsCartVisible(true);
  };

  const handleMouseLeave = () => {
    if (cart.items.length === 0) {
      setIsCartVisible(false);
    }
  };

  useEffect(() => {
    if (cart.items.length > 0) {
      setIsCartVisible(true);
    }
  }, [cart.items.length]);

  const handleCheckoutClick = () => {
    setIsCheckoutVisible(true); // Show checkout form
  };

  return (
    <>
      {/* Cart Sidebar for Desktop */}
      {!isMobile && (
        <div
          className="fixed right-0 w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out"
          style={{
            top: "64px",
            height: "calc(100% - 64px)",
            transform: isCartVisible ? "translateX(0)" : "translateX(100%)",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="p-6 overflow-y-auto h-full">
            <h1 className="text-black font-bold text-2xl mb-4">Cart</h1>
            <ol>
              {cart.items.length > 0 ? (
                cart.items.map((val, i) => (
                  <li key={i} className="mb-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        src={val.image || "/placeholder.png"}
                        alt={val.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <span className="mr-5 text-sm sm:text-base">Name: {val.name}</span>
                        <span className="mr-5 text-sm sm:text-base">Quantity: {val.quantity}</span>
                        <span className="mr-5 text-sm sm:text-base">
                          Price: ${(val.price * val.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="inline-block space-x-2">
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded-md text-sm sm:text-base"
                        onClick={() => increaseQuantity(val.id)}
                      >
                        +
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded-md text-sm sm:text-base"
                        onClick={() => decreaseQuantity(val.id)}
                      >
                        -
                      </button>
                      <button
                        className="bg-gray-600 text-white px-2 py-1 rounded-md text-sm sm:text-base"
                        onClick={() => deleteItem(val.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-sm sm:text-base">Your cart is empty.</p>
              )}
            </ol>
            {cart.items.length > 0 && (
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full text-sm sm:text-base"
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      )}

      {/* Checkout Form */}
      {isCheckoutVisible && (
        <CheckoutForm
          setIsCheckoutVisible={setIsCheckoutVisible}
          setOrderDetails={setOrderDetails} // Pass the setOrderDetails function to CheckoutForm
        />
      )}

      {/* Order Details after successful order */}
      {orderDetails && (
        <div className="p-6 bg-white shadow-lg mt-6 mx-4 sm:mx-0">
          <h2 className="text-xl font-bold mb-4">Order Confirmation</h2>
          <p><strong>Name:</strong> {orderDetails.name}</p>
          <p><strong>Email:</strong> {orderDetails.email}</p>
          <p><strong>Address:</strong> {orderDetails.address}</p>
          <h3 className="mt-4 font-semibold">Items:</h3>
          <ul>
            {orderDetails.cartItems.map((item: any, index: number) => (
              <li key={index}>
                <p>{item.name} - Quantity: {item.quantity} - Price: ${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4"><strong>Order ID:</strong> {orderDetails._id}</p>
        </div>
      )}

      {/* Submission Form after Order Details */}
      {orderDetails && (
        <div className="p-6 bg-white shadow-lg mt-6 mx-4 sm:mx-0">
          <h3 className="text-lg font-bold mb-4">Submit Your Order</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md text-sm sm:text-base"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md text-sm sm:text-base"
            />
            <textarea
              placeholder="Address"
              className="w-full px-4 py-2 border rounded-md text-sm sm:text-base"
              rows={4}
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm sm:text-base"
            >
              Submit Order
            </button>
          </form>
        </div>
      )}

      {/* Mobile Version of Cart */}
      {isMobile && (
        <div className="block md:hidden fixed bottom-0 w-full bg-white shadow-lg z-50">
          <div className="p-4">
            <h1 className="text-black font-bold text-xl mb-4">Cart</h1>
            <ol>
              {cart.items.length > 0 ? (
                cart.items.map((val, i) => (
                  <li key={i} className="mb-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        src={val.image || "/placeholder.png"}
                        alt={val.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <span className="mr-5 text-sm sm:text-base">Name: {val.name}</span>
                        <span className="mr-5 text-sm sm:text-base">Quantity: {val.quantity}</span>
                        <span className="mr-5 text-sm sm:text-base">
                          Price: ${(val.price * val.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="inline-block space-x-2">
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded-md text-sm sm:text-base"
                        onClick={() => increaseQuantity(val.id)}
                      >
                        +
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded-md text-sm sm:text-base"
                        onClick={() => decreaseQuantity(val.id)}
                      >
                        -
                      </button>
                      <button
                        className="bg-gray-600 text-white px-2 py-1 rounded-md text-sm sm:text-base"
                        onClick={() => deleteItem(val.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-sm sm:text-base">Your cart is empty.</p>
              )}
            </ol>
            {cart.items.length > 0 && (
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full text-sm sm:text-base"
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
