import React, { useMemo, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";
import { categories } from "../assets/assets";
import { FiSearch } from "react-icons/fi";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
];

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let list = products;

    if (searchQuery.length > 0) {
      list = list.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (activeCategory !== "all") {
      list = list.filter(
        (product) => product.category.toLowerCase() === activeCategory.toLowerCase(),
      );
    }

    list = [...list];
    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.offerPrice - b.offerPrice);
        break;
      case "price-desc":
        list.sort((a, b) => b.offerPrice - a.offerPrice);
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return list;
  }, [products, searchQuery, activeCategory, sortBy]);

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 dark:border-slate-700 border-t-primary" />
      </div>
    );
  }

  return (
    <div className="mt-16 mb-16 flex flex-col px-3 sm:px-6 lg:px-0">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">Shop</span>
          <p className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-1">
            All Products
          </p>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort products"
          className="w-full sm:w-56 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-slate-100 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category filter chips */}
      <div className="flex items-center gap-2 mt-6 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setActiveCategory("all")}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            activeCategory === "all"
              ? "bg-primary text-white border-primary"
              : "border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:border-primary/50"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.path}
            onClick={() => setActiveCategory(cat.text)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === cat.text
                ? "bg-primary text-white border-primary"
                : "border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:border-primary/50"
            }`}
          >
            {cat.text}
          </button>
        ))}
      </div>

      {/* Product List */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mt-8 w-full">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FiSearch size={48} />}
          title="No products found"
          subtitle="Try a different search term or category."
        />
      )}
    </div>
  );
};

export default AllProducts;
