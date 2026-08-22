import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);
  

  return (
  <div className='mt-16 flex flex-col px-3 sm:px-6 lg:px-0'>

    {/* Heading */}
    <div className='flex flex-col items-start w-full'>
      <p className='text-xl sm:text-2xl font-medium uppercase'>
        All Products
      </p>
      <div className='w-16 sm:w-20 h-0.5 bg-primary mt-2 rounded-full'></div>
    </div>

    {/* Product List */}
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mt-8 w-full'>
      {filteredProducts.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>

  </div>
)
}

export default AllProducts;
