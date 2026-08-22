import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast"
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
console.log(process.env.REACT_APP_BACKEND_URL);

const currency = process.env.REACT_APP_CURRENCY || "$";


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  console.log("ENV:", process.env.REACT_APP_BACKEND_URL);

  const currency = "$";
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [cartLoaded, setCartLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Seller Status

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
    }
  };
  // Fetch user Auth Status, User Data and cart items
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");

      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
        setCartLoaded(true);
      } else {
        setUser(null);
        setCartLoaded(true);
      }
    } catch (error) {
      setUser(null);
      setCartLoaded(true);
    }
  };

  // Fetch All Products

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // Add Products to Cart
  const addToCart = (itemId) => {
    const product = products.find((item) => item._id === itemId);
    if (product && !product.inStock) {
      toast.error("Product is out of stock");
      return;
    }

    let cartData = { ...cartItems };

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added To Cart");
  };
  // Update Cart Item Qunatity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
  };
  // Remove Product from Cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    toast.success("Removed from Cart");
    setCartItems(cartData);
  };
  // Get Cart Item Count
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };
  // Get Cart Total Amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);
  // Update Database cart Items

  // Update Database cart Items
  useEffect(() => {
    if (!user || !cartLoaded) return;

    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", {
          cartItems,
        });

        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    updateCart();
  }, [cartItems, user, cartLoaded]);
  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    cartItems,
    setCartItems,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
    axios,
    fetchProducts,
  };

  // ✅ Correct Provider
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};;

// ✅ Custom hook (correct)
export const useAppContext = () => {
  return useContext(AppContext);
};
