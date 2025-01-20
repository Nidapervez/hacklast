import React from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

// Define the structure of your product data
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  priceWithoutDiscount: number;
  rating: number;
  ratingCount: number;
  tags: string[];
  sizes: string[];
  image:string;
  };


// Fetch product data using a fetch call inside the component
const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const query = `*[_type == "product" && _id == $id]{
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
    image
  }`;

  try {
    const result = await client.fetch(query, { id });
    const product = result[0] || null; // Get the first product or null if not found

    if (!product) {
      return <div>Product not found</div>;
    }

    return (
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{product.name}</h1>
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Product Image Section */}
          <div className="flex-1 max-w-sm mx-auto sm:max-w-lg sm:w-1/2">
            <Image
                             src={product.image || "/placeholder.png"} // Handle the image URL
                             alt={product.name || "Product Image"}
                             width={300}
                             height={300}
                             className="w-full h-64 object-cover rounded-md mb-4"
                           />
          </div>

          {/* Product Information Section */}
          <div className="flex-1 sm:w-1/2">
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-gray-700">{product.description}</p>
              <div className="flex items-center space-x-4">
                <p className="text-2xl sm:text-3xl font-semibold text-gray-800">${product.price}</p>
                {product.discountPercentage && (
                  <span className="text-lg sm:text-xl text-red-500 line-through">
                    ${product.priceWithoutDiscount}
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base text-gray-500">
                {product.rating} ★ ({product.ratingCount} reviews)
              </p>
              <p className="text-sm sm:text-base text-gray-600">Sizes: {product.sizes?.join(", ")}</p>

              {/* Snipcart Add to Cart Button */}
         
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product details:", error);
    return <div>Something went wrong</div>;
  }
};

export default ProductDetailPage;
