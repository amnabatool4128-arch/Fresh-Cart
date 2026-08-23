import React from "react";
const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 mt-20 md:mt-24 mb-16 md:mb-20 bg-surface dark:bg-slate-800 rounded-2xl py-14 px-6">
      <h1 className="md:text-3xl text-2xl font-semibold text-gray-900 dark:text-white">Never Miss a Deal!</h1>
      <p className="md:text-base text-sm text-gray-500 dark:text-slate-400 pb-6">
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts
      </p>
      <form className="flex items-center justify-between max-w-md w-full h-12">
        <input
          className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg h-full border-r-0 outline-none w-full rounded-r-none px-4 text-sm text-gray-600 dark:text-slate-100 dark:placeholder-slate-500 focus:border-primary/50 transition-colors"
          type="text"
          placeholder="Enter your email id"
          required
        />
        <button
          type="submit"
          className="px-6 md:px-8 h-full text-white text-sm bg-primary hover:bg-primary-dull transition-colors cursor-pointer rounded-lg rounded-l-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};
export default NewsLetter;
