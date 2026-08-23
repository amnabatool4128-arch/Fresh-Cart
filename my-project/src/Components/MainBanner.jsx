import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';

const MainBanner = () => {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-card">
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full md:hidden"
      />
      <div
        className="absolute inset-0 flex flex-col items-center md:items-start justify-end
      md:justify-center pb-20 md:pb-0 px-4 md:pl-18 lg:pl-24"
      >
        <span className="hidden md:inline-block mb-4 px-3 py-1 rounded-md bg-white/85 backdrop-blur-sm text-primary text-xs font-semibold tracking-widest uppercase">
          Fresh groceries, delivered daily
        </span>
        <h1 className="text-3xl text-gray-900 md:text-[44px] lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-96 lg:max-w-[460px] leading-tight lg:leading-[1.1]">
          Fresh groceries, delivered to your door.
        </h1>
        <p className="hidden md:block text-gray-600 mt-4 max-w-sm">
          Farm-fresh produce and everyday essentials, picked with care and delivered fast.
        </p>

        <div className="flex items-center mt-6 gap-6 font-medium">
          <Link
            to={"/products"}
            className="group flex items-center gap-2 px-7 md:px-8 py-3 bg-primary hover:bg-primary-dull transition-colors rounded-lg text-white cursor-pointer"
          >
            Shop Now
            <img
              className="transition group-hover:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>
          <Link
            to={"/products"}
            className="group hidden md:flex items-center gap-2 text-gray-800 hover:text-primary transition-colors cursor-pointer"
          >
            Explore Deals
            <img
              className="transition group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainBanner
