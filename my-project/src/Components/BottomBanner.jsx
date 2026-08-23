import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
  return (
    <div className="relative mt-20 md:mt-24 rounded-2xl overflow-hidden md:min-h-[440px]">
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full md:hidden "
      />
      <div className="absolute inset-0 flex flex-col items-center md:items-end
       md:justify-center pt-16 md:pt-0 md:pr-24">
        <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm md:bg-transparent md:dark:bg-transparent md:backdrop-blur-none rounded-2xl p-6 md:p-0">
          <span className="hidden md:block text-primary text-xs font-semibold tracking-widest uppercase mb-3">Why Fresh Cart</span>
          <h1 className='text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-5 md:mb-6'>What makes us different</h1>
          {features.map((feature, index)=>(
            <div key={index} className='flex items-center gap-4 mt-4 first:mt-0'>
              <div className="p-2.5 bg-white dark:bg-slate-800 md:bg-primary/10 md:dark:bg-primary/20 rounded-lg shrink-0">
                <img src={feature.icon} alt={feature.title} className='md:w-8 w-7'/>
              </div>
              <div>
              <h3 className='text-base md:text-lg font-semibold text-gray-900 dark:text-white'>{feature.title}</h3>
              <p className='text-gray-500 dark:text-slate-400 text-xs md:text-sm'>{feature.description}</p>
              </div>

            </div>

          ))}
        </div>
      </div>
    </div>
  );
}

export default BottomBanner
