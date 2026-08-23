import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
const ProductCard = ({product}) => {
    
  
  const {currency, addToCart, removeFromCart, cartItems, navigate} = useAppContext()
  console.log("Currency: ", currency)

  
  const discountPercent =
    product && product.price > product.offerPrice
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0;

  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`,
          );
          window.scrollTo(0, 0);
        }}
        className="group cursor-pointer rounded-2xl md:p-4 p-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:border-gray-200 dark:hover:border-slate-600 hover:shadow-card transition-all duration-200 w-full max-w-[240px] mx-auto"
      >
        <div className="relative flex items-center justify-center px-2 py-3 bg-surface/60 dark:bg-slate-900/60 rounded-xl overflow-hidden">
          {discountPercent > 0 && product.inStock && (
            <span className="absolute top-2 left-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-primary text-[11px] font-semibold px-1.5 py-0.5 rounded-md">
              -{discountPercent}%
            </span>
          )}
          <img
            className="group-hover:scale-105 transition-transform duration-200 max-w-26 md:max-w-36"
            src={product.image[0]}
            alt={product.name}
          />
        </div>
        <div className="text-sm mt-3">
          <span className="inline-block text-[11px] text-gray-500 dark:text-slate-300 bg-surface dark:bg-slate-700 px-2 py-0.5 rounded-md">
            {product.category}
          </span>
          <p className="text-gray-900 dark:text-white font-medium text-base md:text-lg truncate w-full mt-1.5">
            {product.name}
          </p>
          {!product.inStock && (
            <p className="text-red-500 dark:text-red-400 text-xs font-medium mt-0.5">Out of Stock</p>
          )}
          <div className="flex items-center gap-0.5 mt-1.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="md:w-3.5 w-3"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                />
              ))}
            <p className="text-gray-400 dark:text-slate-500 text-xs ml-1">({4})</p>
          </div>
          <div className="flex items-end justify-between mt-3">
            <p className="md:text-xl text-base font-semibold text-gray-900 dark:text-white">
              {currency}
              {product.offerPrice}{" "}
              <span className="text-gray-400 dark:text-slate-500 md:text-sm text-xs font-normal line-through">
                {currency}
                {product.price}
              </span>
            </p>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {!product.inStock ? (
                <button
                  disabled
                  className="flex items-center justify-center cursor-not-allowed gap-1 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 md:w-[80px] w-[64px] h-[34px] rounded-lg text-gray-400 dark:text-slate-500 font-medium text-xs"
                >
                  Out of Stock
                </button>
              ) : !cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center cursor-pointer gap-1 bg-primary hover:bg-primary-dull active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 md:w-[80px] w-[64px] h-[34px] rounded-lg text-white font-medium text-sm transition-all"
                  onClick={() => addToCart(product._id)}
                  aria-label={`Add ${product.name} to cart`}
                >
                  <img src={assets.cart_icon} alt="" className="brightness-0 invert" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-surface dark:bg-slate-700 rounded-lg select-none">
                  <button
                    onClick={() => {
                      removeFromCart(product._id);
                    }}
                    aria-label={`Decrease quantity of ${product.name}`}
                    className="cursor-pointer text-md px-2 h-full text-gray-600 dark:text-slate-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
                  >
                    -
                  </button>
                  <span className="w-5 text-center font-medium text-gray-800 dark:text-white">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => {
                      addToCart(product._id);
                    }}
                    aria-label={`Increase quantity of ${product.name}`}
                    className="cursor-pointer text-md px-2 h-full text-gray-600 dark:text-slate-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
