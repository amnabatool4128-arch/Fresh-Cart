import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../Context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  if (!products || products.length === 0) return <p>Loading...</p>;

  return (
    <div className="mt-20">
      <p className="font-medium text-2xl md:text-3xl">Best Sellers</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
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
