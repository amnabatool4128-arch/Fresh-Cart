import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import QuantityStepper from "../Components/QuantityStepper";
import EmptyState from "../Components/EmptyState";
import { FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    addToCart,
    removeFromCart,
    getCartCount,
    navigate,
    getCartAmount,
    axios,
    user,
    setCartItems
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];

    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);

      if (product && cartItems[key] > 0) {
        tempArray.push({
          ...product,
          quantity: cartItems[key],
        });
      }
    }

    setCartArray(tempArray);
  };

  // Removes a line item entirely, unlike removeFromCart (context) which only decrements by one.
  const removeItemEntirely = (itemId) => {
    const cartData = structuredClone(cartItems);
    delete cartData[itemId];
    setCartItems(cartData);
    toast.success("Removed from Cart");
  };

  const getuserAddress = async ()=>{
    try {
      const {data} = await axios.get('/api/address/get');
      if (data.success){
        setAddresses(data.addresses)
        if(data.addresses.length >0){
          setSelectedAddress(data.addresses[0])
          toast.success(data.message);
        }
      }else{
        toast.error(data.message)
      }


    } catch (error) {
      toast.error(error.message)

    }
  }



const placeOrder = async () => {
  try {
    // 1. Check login
    if (!user) {
      return toast.error("Please login first");
    }

    // 2. Check cart
    if (cartArray.length === 0) {
      return toast.error("Your cart is empty");
    }

    // 2b. Check no out-of-stock items are in the cart
    if (cartArray.some((item) => !item.inStock)) {
      return toast.error("Remove out-of-stock items from your cart to continue");
    }

    // 3. Check address
    if (!selectedAddress?._id) {
      return toast.error("Please select a delivery address");
    }

    // 4. Prepare items
    const items = cartArray.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));

    // 5. COD
    if (paymentOption === "COD") {
      const { data } = await axios.post("/api/order/cod", {
        items,
        address: selectedAddress._id,
      });

      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        navigate("/my-orders");
      } else {
        toast.error(data.message);
      }

      return;
    }

    // 6. Online Payment / Stripe
    const { data } = await axios.post("/api/order/stripe", {
      items,
      address: selectedAddress._id,
    });

    if (data.success && data.url) {
      window.location.href = data.url;
    } else {
      toast.error(data.message || "Unable to start payment");
    }
  } catch (error) {
    console.error("Place order error:", error);
    toast.error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};



  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  useEffect(()=>{
    if(user){
      getuserAddress()
    }

  }, [user])

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 dark:border-slate-700 border-t-primary" />
      </div>
    );
  }

  if (cartArray.length === 0) {
    return (
      <EmptyState
        icon={<FiShoppingCart size={56} />}
        title="Your cart is empty"
        subtitle="Looks like you haven't added anything yet. Explore fresh picks and get shopping."
        actionLabel="Start Shopping"
        onAction={() => navigate("/products")}
      />
    );
  }

  return (
    <div className="flex flex-col md:flex-row mt-16 mb-16 gap-10">
      {/* LEFT */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Shopping Cart{" "}
          <span className="text-sm font-normal text-primary">{getCartCount()} items</span>
        </h1>

        <div className="mt-6 divide-y divide-gray-100 dark:divide-slate-800 border-y border-gray-200 dark:border-slate-700">
          {cartArray.map((product) => (
            <div
              key={product._id}
              className="flex items-center gap-4 py-5"
            >
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`,
                  );
                  window.scrollTo(0, 0);
                }}
                className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center border border-gray-200 dark:border-slate-700 bg-surface dark:bg-slate-800 rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  className="w-full h-full object-contain p-2"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p
                  onClick={() => {
                    navigate(
                      `/products/${product.category.toLowerCase()}/${product._id}`,
                    );
                    window.scrollTo(0, 0);
                  }}
                  className="font-medium text-gray-900 dark:text-white truncate cursor-pointer hover:text-primary transition-colors"
                >
                  {product.name}
                </p>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
                  Weight: {product.weight || "N/A"}
                </p>
                {!product.inStock && (
                  <p className="text-red-500 dark:text-red-400 text-xs font-medium mt-1">Out of Stock</p>
                )}

                <div className="flex items-center gap-4 mt-3">
                  <QuantityStepper
                    quantity={product.quantity}
                    onIncrease={() => addToCart(product._id)}
                    onDecrease={() => removeFromCart(product._id)}
                    size="sm"
                  />
                  <button
                    onClick={() => removeItemEntirely(product._id)}
                    aria-label={`Remove ${product.name} from cart`}
                    className="cursor-pointer rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors"
                  >
                    <img
                      src={assets.remove_icon}
                      alt=""
                      className="w-5 h-5 dark:invert opacity-70"
                    />
                  </button>
                </div>
              </div>

              <p className="shrink-0 font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                {currency}
                {product.offerPrice * product.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* CONTINUE SHOPPING */}
        <button
          onClick={() => {
            navigate("/products");
            window.scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
        >
          <img
            src={assets.arrow_right_icon_colored}
            alt=""
            className="group-hover:-translate-x-1 transition"
          />
          Continue Shopping
        </button>
      </div>

      {/* RIGHT */}
      <div className="max-w-[380px] w-full bg-surface dark:bg-slate-800 rounded-xl p-5 md:p-6 max-md:mt-4 border border-gray-200 dark:border-slate-700 h-fit">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Order Summary</h2>
        <hr className="border-gray-200 dark:border-slate-700 my-5" />

        {/* ADDRESS */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-slate-300">Delivery Address</p>

          <div className="relative mt-2">
            <p className="text-sm text-gray-500 dark:text-slate-400">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>

            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary text-sm font-medium hover:underline cursor-pointer mt-1"
            >
              Change
            </button>

            {showAddress && (
              <div className="absolute top-14 py-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-card-hover w-full z-10">
                {addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="p-2.5 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.country}
                  </p>
                ))}

                <p
                  onClick={() => navigate("/add-address")}
                  className="text-primary text-sm text-center cursor-pointer p-2.5 hover:bg-primary/10 transition-colors"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          {/* PAYMENT */}
          <p className="text-xs font-semibold uppercase tracking-wide mt-6 text-gray-700 dark:text-slate-300">Payment Method</p>

          <select
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-slate-100 rounded-lg px-3 py-2.5 mt-2 text-sm outline-none focus:border-primary transition-colors"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-200 dark:border-slate-700" />

        {/* TOTAL */}
        <div className="text-sm text-gray-500 dark:text-slate-400 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>

          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-primary font-medium">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartAmount() * 2) / 100}
            </span>
          </p>

          <p className="flex justify-between items-center pt-3 mt-1 border-t border-gray-200 dark:border-slate-700 font-semibold text-base text-gray-900 dark:text-white">
            <span>Total Amount</span>
            <span>
              {currency}
              {getCartAmount() + (getCartAmount() * 2) / 100}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 bg-primary text-white hover:bg-primary-dull rounded-lg font-medium transition-colors"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
