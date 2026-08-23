import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../Components/ProductCard";

const ProductDetails = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const product = products.find((item) => item._id === id);
  const discountPercent =
    product && product.price > product.offerPrice
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0;

  useEffect(() => {
    if (products.length > 0 && product) {
      let productsCopy = products.filter(
        (item) =>
          item.category === product.category && item._id !== product._id,
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products, product]);

  useEffect(() => {
    if (product?.image?.length > 0) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  return (
    product && (
      <div className="mt-12">
        <p className="text-gray-500 dark:text-slate-400">
          <Link to={"/"} className="hover:text-primary transition-colors">Home</Link> /<Link to={"/products"} className="hover:text-primary transition-colors"> Products</Link> /
          <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors">
            {product.category}
          </Link>{" "}
          /<span className="text-primary"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className={`border max-w-24 rounded-lg overflow-hidden cursor-pointer transition-colors ${
                    thumbnail === image ? "border-primary" : "border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600"
                  }`}
                >
                  <img src={image} alt="" />
                </div>
              ))}
            </div>

            <div className="relative border border-gray-200 dark:border-slate-700 bg-surface dark:bg-slate-800 max-w-100 rounded-lg overflow-hidden">
              {discountPercent > 0 && product.inStock && (
                <span className="absolute top-3 left-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-primary text-xs font-semibold px-2 py-1 rounded-md z-10">
                  -{discountPercent}%
                </span>
              )}
              <img
                src={thumbnail}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium text-gray-900 dark:text-white">{product.name}</h1>
            {!product.inStock && (
              <p className="text-red-500 dark:text-red-400 font-medium mt-1">Out of Stock</p>
            )}

            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt=""
                    className="md:w-4 w-3.5"
                  />
                ))}
              <p className="text-base ml-2 text-gray-500 dark:text-slate-400">(4)</p>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                {currency}
                {product.offerPrice}
              </p>
              {discountPercent > 0 && (
                <p className="text-gray-500/70 dark:text-slate-500 line-through mb-1">
                  {currency} {product.price}
                </p>
              )}
              {discountPercent > 0 && (
                <span className="text-primary text-sm font-semibold mb-1">-{discountPercent}%</span>
              )}
            </div>
            <span className="text-gray-500/70 dark:text-slate-500 text-xs">(inclusive of all taxes)</span>

            <p className="text-base font-medium mt-6 text-gray-900 dark:text-white">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70 dark:text-slate-400">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => addToCart(product._id)}
                disabled={!product.inStock}
                className={`w-full py-3.5 rounded-lg font-medium transition-colors ${
                  product.inStock
                    ? "bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-slate-100"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 cursor-not-allowed"
                }`}
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                }}
                disabled={!product.inStock}
                className={`w-full py-3.5 rounded-lg font-medium transition-colors ${
                  product.inStock
                    ? "bg-primary text-white hover:bg-primary-dull"
                    : "bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-slate-500 cursor-not-allowed"
                }`}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="flex flex-col items-center mt-20">
          <p className="text-3xl font-medium text-gray-900 dark:text-white">Related Products</p>
          <div className=" w-20 h-0.5 bg-primary rounded-full mt-2"></div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 w-full">
            {relatedProducts
              .filter((item) => item.inStock)
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>
          <button onClick={()=> {navigate('/products'); window.scrollTo(0,0)}} className="mx-auto cursor-pointer px-12 my-16 py-2.5 border border-primary rounded-lg text-primary hover:bg-primary/10 transition-colors">
            See More
          </button>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
