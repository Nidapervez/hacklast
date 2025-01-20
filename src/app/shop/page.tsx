import React from 'react'
import Shop from '../components/page1'
import Accesories from '../components/accesories'

const page = () => {
  return (
    <div>
      <div>
            <div
    className="flex flex-col justify-center items-start px-20 py-28 mt-6 w-full text-center bg-violet-50 max-md:px-5 max-md:pb-24 max-md:max-w-full"
    role="region"
    aria-label="Shop Navigation"
  >
    <div className="">
      <h1 className="text-4xl font-bold text-indigo-950 ml-5">Shop List</h1>
      <nav aria-label="Breadcrumb">
        <ol className="flex gap-1.5 self-start mt-2.5 text-base font-medium">
          <li className="flex gap-1 text-black">
            <a
              href="/"
              className="grow hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 ml-16"
            >
              Home
            </a>
            <span aria-hidden="true">.</span>
          </li>
          <li className="flex gap-1 text-black">
            <a
              href="/pages"
              className="hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              Pages
            </a>
            <span className="text-pink-500" aria-hidden="true">
              .
            </span>
          </li>
          <li className="text-pink-500" aria-current="page">
            ShopList
          </li>
        </ol>
      </nav>
    </div>
  </div>
  </div>
 <div className='mt-32 ml-20'> <Accesories/></div>
      
      
      
      
      
      <Shop/></div>
  )
}

export default page
