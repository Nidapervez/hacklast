// src/app/products/page.tsx
"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

import Accesories from "../components/accesories";

const Page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "allProducts"]{
        _id,
        title,
        slug,
        imageUrl,
        alt,
        price
      }`;

      try {
        const result = await client.fetch(query);
        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
    <div className='bg-[#F6F5FF] h-60'> <div className="flex flex-col text-center rounded-none max-w-[314px] ">
    <div className="w-full text-4xl font-bold text-indigo-950 mx-32 mt-16">
      Shop Grid Default
    </div>
    <div className="flex gap-1 self-start mt-2.5 text-base font-medium text-black mx-32">
      <div>Home</div>
      <div>.</div>
      <div>Pages</div>
      <div className="text-pink-500">
<p>ShopGridDefault</p></div>
    </div>
  </div>
  </div>
 <div className='mt-32 mx-32'><Accesories/></div>
      <h1>Product List</h1>
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4">
            <Link href={`/products/${product.slug?.current}`}>
              <Image
                src={product.imageUrl || "/placeholder.png"}
                alt={product.alt || "Product Image"}
                width={200}
                height={200}
              />
              <h2>{product.title}</h2>
              <p>${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
