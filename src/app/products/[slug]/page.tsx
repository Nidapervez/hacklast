// src/app/products/[slug]/page.tsx

import React from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

const ProductDetail = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  // Query to fetch the product details based on the slug
  const query = `*[_type == "allProducts" && slug.current == $slug][0]{
    _id,
    title,
    description,
    imageUrl,
    alt,
    price
  }`;

  // Fetch the product details from Sanity
  const product = await client.fetch(query, { slug });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
        {/* Product Image */}
        <div className="w-full sm:w-1/2">
          <Image
            src={product.imageUrl || "/placeholder.png"}
            alt={product.alt || "Product Image"}
            width={400}
            height={400}
            className="rounded-md mx-auto"
          />
        </div>

        {/* Product Details */}
        <div className="w-full sm:w-1/2 text-center sm:text-left">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <p className="text-gray-800 font-bold mt-4 text-xl">
            Price: ${product.price}
          </p>

          <button
            className="snipcart-add-item px-9 py-4 bg-pink-500 rounded-sm max-md:px-5 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            data-item-id={product._id} // Use _id as the unique identifier
            data-item-price={product.price}
            data-item-description={product.description}
            data-item-image={product.imageUrl} // Corrected image field
            data-item-name={product.title} // Corrected product name field
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
