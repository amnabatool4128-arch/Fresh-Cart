import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  if (!products || products.length === 0) return <p className="mt-20 text-gray-500 dark:text-slate-400">Loading...</p>;

  return (
    <div className="mt-20 md:mt-24">
      <div className="flex items-end justify-between">
        <div>
          <span className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">Handpicked</span>
          <p className="font-semibold text-2xl md:text-3xl text-gray-900 dark:text-white mt-1">Best Sellers</p>
        </div>
        <Link
          to="/products"
          className="group hidden sm:flex items-center gap-1.5 text-gray-700 dark:text-slate-300 hover:text-primary text-sm font-medium transition-colors"
        >
          View All
          <img
            src={assets.arrow_right_icon_colored}
            alt=""
            className="w-3.5 scale-x-[-1] group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 lg:grid-cols-5 mt-7">
        {products
          .filter((product) => product.inStock) // ✅ fixed
          .slice(0, 5)
          .map((product) => (
            <ProductCard key={product._id} product={product} /> // ✅ fixed
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
