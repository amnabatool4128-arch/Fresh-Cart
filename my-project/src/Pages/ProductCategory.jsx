import React, { useMemo, useState } from 'react'
import { useAppContext } from '../Context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../Components/ProductCard'
import EmptyState from '../Components/EmptyState'
import { FiSearch } from 'react-icons/fi'

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
];

const ProductCategory = () => {
    const { products } = useAppContext()
    const { category } = useParams()
    const [sortBy, setSortBy] = useState("featured")

    const searchCategory = categories.find((item)=> item.path.toLowerCase() === category)

    const normalize = (str) =>
      str?.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "");

    const filteredProducts = useMemo(() => {
      let list = products.filter(
        (product) => normalize(product.category) === normalize(category),
      );

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
    }, [products, category, sortBy]);

    if (products.length === 0) {
      return (
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 dark:border-slate-700 border-t-primary" />
        </div>
      );
    }

  return (
    <div className='mt-16 mb-16'>
      <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'>
        <div className='flex flex-col items-start'>
            <p className='text-2xl font-semibold text-gray-900 dark:text-white'>
                {searchCategory ? searchCategory.text : category}
            </p>
            <div className='w-16 h-0.5 bg-primary rounded-full mt-1'></div>
        </div>

        {filteredProducts.length > 0 && (
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort products"
            className="w-full sm:w-56 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-slate-100 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}
      </div>

    {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
    gap-3 md:gap-6 lg:grid-cols-5 mt-8'>
            {filteredProducts.map((product)=>(
                <ProductCard key={product._id} product={product}/>
            ))}
        </div>
    ): (
        <EmptyState
          icon={<FiSearch size={48} />}
          title="No products found"
          subtitle="There are no products in this category yet."
        />
        )}


    </div>
  )
}

export default ProductCategory
