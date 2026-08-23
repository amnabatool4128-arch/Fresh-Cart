import React from 'react'
import { useAppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';

const ProductList = () => {
  const {products, currency, axios, fetchProducts} = useAppContext();

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data.success){
        fetchProducts();
        toast.success(data.message)
      }else{
        toast.error(data.message);


      }
    } catch (error) {
        toast.error(error.message);
    }
  };

  const deleteProductHandler = async (id) => {
    if (!window.confirm("Permanently delete this product? This cannot be undone.")) return;
    try {
      const { data } = await axios.delete(`/api/product/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  
    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between bg-white dark:bg-slate-900">
            <div className="w-full md:p-10 p-4">
                <h2 className="pb-4 text-lg font-medium text-gray-900 dark:text-white">All Products</h2>
                <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                    <table className="md:table-auto table-fixed w-full overflow-hidden">
                        <thead className="text-gray-900 dark:text-white text-sm text-left bg-surface dark:bg-slate-700/50">
                            <tr>
                                <th className="px-4 py-3 font-semibold truncate">Product</th>
                                <th className="px-4 py-3 font-semibold truncate">Category</th>
                                <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                                <th className="px-4 py-3 font-semibold truncate">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-500 dark:text-slate-400">
                            {products.map((product) => (
                                <tr key={product._id} className="border-t border-gray-200 dark:border-slate-700">
                                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                                        <div className="border border-gray-200 dark:border-slate-600 bg-surface dark:bg-slate-900 rounded-lg overflow-hidden">
                                            <img src={product.image[0]} alt="Product" className="w-16" />
                                        </div>
                                        <span className="truncate max-sm:hidden w-full text-gray-800 dark:text-slate-200">{product.name}</span>
                                    </td>
                                    <td className="px-4 py-3">{product.category}</td>
                                    <td className="px-4 py-3 max-sm:hidden">{currency}{product.offerPrice}</td>
                                    <td className="px-4 py-3">
                                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 dark:text-white gap-3">
                                            <input onClick={()=> toggleStock(product._id, !product.inStock)} checked={product.inStock}
                                            type="checkbox" className="sr-only peer"/>
                                            <div className="w-12 h-7 bg-gray-300 dark:bg-slate-600 rounded-full peer peer-checked:bg-primary transition-colors duration-200"></div>
                                            <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                        </label>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                          onClick={() => deleteProductHandler(product._id)}
                                          aria-label={`Delete ${product.name}`}
                                          className="cursor-pointer rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors"
                                        >
                                            <img src={assets.remove_icon} alt="" className="inline-block w-5 h-5 dark:invert" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default ProductList;