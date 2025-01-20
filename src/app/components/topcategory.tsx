"use client"

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client"; // Ensure that the Sanity client is imported

const Topcategory = () => {
  const [topProducts, setTopProducts] = useState([]);
  
  useEffect(() => {
    const fetchTopProducts = async () => {
      const query = `*[_type == "top"]{
        title,
        slug,
        description,
        imageUrl,
        alt,
        price
      }`;
      const products = await client.fetch(query);
      setTopProducts(products); // Set the fetched data in state
    };

    fetchTopProducts();
  }, []);

  if (topProducts.length === 0) {
    return <div>Loading...</div>; // Loading state until data is fetched
  }

  return (
    <div className="mt-10">
      <div>
        <div className="flex gap-5 max-md:flex-col">
          {/* First Product (Dynamic) */}
          <div className="flex flex-col w-[26%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-center pt-1.5 pr-11 w-full">
              <div className="flex flex-col justify-center items-center px-10 w-full rounded-full shadow-2xl aspect-square bg-slate-50 max-md:px-5 max-md:mt-10">
                {/* Dynamic Image */}
                <img
                  loading="lazy"
                  src={topProducts[0].imageUrl} // Use the fetched image URL
                  alt={topProducts[0].alt} // Use the fetched alt text
                  className="object-contain aspect-square w-[178px]"
                />
              </div>
              {/* Dynamic Title */}
              <div className="flex gap-1.5 mt-5 max-w-full text-xl whitespace-nowrap text-violet-950 w-[150px]">
                <div className="grow">{topProducts[0].title}</div>
              </div>
              {/* Dynamic Price */}
              <div className="mt-3.5 text-base text-violet-950">
                ${topProducts[0].price} {/* Use the fetched price */}
              </div>
            </div>
          </div>

          {/* Other Products (Example Static Data - Repeat for other products if needed) */}
          <div className="flex flex-col ml-5 w-[74%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col w-full max-md:max-w-full">
              <div className="max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  {/* Repeat dynamic data for other products here */}
                  {topProducts.slice(1, 4).map((product, index) => (
                    <div key={index} className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col justify-center items-center px-12 w-full rounded-full shadow-2xl aspect-square bg-slate-50 max-md:px-5 max-md:mt-10">
                        {/* Dynamic Image for other products */}
                        <img
                          loading="lazy"
                          src={product.imageUrl}
                          alt={product.alt}
                          className="object-contain aspect-[1.01] w-[158px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-10 self-center mt-7 max-w-full whitespace-nowrap text-violet-950 w-[766px]">
                {/* Repeat dynamic data for other products */}
                {topProducts.slice(0, 3).map((product, index) => (
                  <div key={index} className="flex flex-col flex-1">
                    <div className="flex gap-1.5 text-xl">
                      <div className="grow">{product.title}</div>
                    </div>
                    <div className="self-center mt-3.5 text-base">
                      ${product.price} {/* Dynamic price */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topcategory;
