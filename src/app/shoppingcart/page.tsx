import React from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { useCart } from "@/app/context"; // Ensure you have a cart context set up
import { Cart } from "../cart";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  discountPercentage?: number;
  priceWithoutDiscount?: string;
  rating: number;
  ratingCount: number;
  tags?: string[];
  sizes?: string[];
  image: string;
  stockLevel: number;
  category: string;
  isFeaturedProduct: boolean;
}

const fetchProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product"]{
    _id,
    name,
    description,
    price,
    discountPercentage,
    priceWithoutDiscount,
    rating,
    ratingCount,
    tags,
    sizes,
    image,
    stockLevel,
    category,
    isFeaturedProduct
  }`;
  return client.fetch(query);
};

const Page = async () => {
  const products = await fetchProducts();
  const { add } = useCart(); // Access the add function from the cart context

  if (!products.length) {
    return <div className="text-center text-lg font-semibold mt-20">No products found.</div>;
  }

  return (
    <div className="container mx-auto mt-10 px-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Product List</h1>

      {/* Display the Cart component */}
      <Cart />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl flex flex-col h-full"
          >
            <div className="flex flex-col items-center p-4 flex-grow">
              <Link href={`/shoppingcart/${product._id}`}>
                <Image
                  src={product.image || "/placeholder.png"}
                  alt={product.name || "Product Image"}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
              </Link>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{product.description}</p>
              <p className="text-lg font-semibold text-gray-800">
                ${parseFloat(product.price).toFixed(2)}
                {product.discountPercentage && (
                  <span className="ml-2 text-sm text-red-500 line-through">
                    ${parseFloat(product.priceWithoutDiscount || "0").toFixed(2)}
                  </span>
                )}
              </p>
              <div className="flex justify-between items-center mt-4 w-full">
                <span className="text-sm text-yellow-500">{product.rating} ★</span>
                <span className="text-sm text-gray-500">{product.ratingCount} reviews</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Category: {product.category}
              </div>
              <div className="mt-1 text-sm text-gray-600">
                Stock Level: {product.stockLevel}
              </div>
            </div>
            {/* Add to Cart Button */}
            <button
              onClick={() =>
                add({
                  id: product._id,
                  name: product.name,
                  price: parseFloat(product.price), // Ensure price is passed as a number
                  quantity: 1,
                  image: product.image || "/placeholder.png", // Include image in cart
                })
              }
              className="mt-4 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
