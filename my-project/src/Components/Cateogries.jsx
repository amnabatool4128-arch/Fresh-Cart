import React from 'react'
import {  categories } from '../assets/assets'
import { useAppContext } from "../Context/AppContext";

const Cateogries = () => {

  const {navigate} = useAppContext()
  return (
    <div className='mt-20 md:mt-24'>
      <span className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">Browse</span>
      <p className='text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-1'>Shop by Category</p>

      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 mt-7 gap-3 md:gap-4'>
       {categories.map((category, index)=>(
        <div
          key={index}
          className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 hover:border-gray-200 dark:hover:border-slate-600 transition-colors"
          onClick={()=>{
            navigate( `/products/${category.path.toLowerCase()}`);
          }}
        >
          <div
            className="flex items-center justify-center pt-4 pb-2"
            style={{background: category.bgColor}}
          >
            <img
              src={category.image}
              alt={category.text}
              className="group-hover:scale-105 transition-transform duration-200 w-16 md:w-20 aspect-square object-contain"
            />
          </div>
          <p className="text-xs md:text-sm font-medium text-gray-700 dark:text-slate-200 dark:bg-slate-800 text-center py-2.5 bg-white">{category.text}</p>
        </div>

       ))}
      </div>
    </div>
  )
}

export default Cateogries
