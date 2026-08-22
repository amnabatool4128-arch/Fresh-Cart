import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
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

      if (product) {
        tempArray.push({
          ...product,
          quantity: cartItems[key],
        });
      }
    }

    setCartArray(tempArray);
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

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-16">
      {/* LEFT */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">{getCartCount()} items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            {/* PRODUCT */}
            <div className="flex items-center md:gap-6 gap-3 cursor-pointer">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`,
                  );
                  window.scrollTo(0, 0);
                }}
                className="w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>

              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                {!product.inStock && (
                  <p className="text-red-500 text-xs font-medium">Out of Stock</p>
                )}

                <div className="font-normal text-gray-500/70">
                  <p>
                    weight: <span>{product.weight || "N/A"}</span>
                  </p>

                  <div className="flex items-center">
                    <p className="cursor-pointer">Qty:</p>
                    <select
                      value={cartItems[product._id] || 1}
                      disabled={!product.inStock}
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                      className="outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {Array(product.quantity > 9 ? product.quantity : 9)
                        .fill("")
                        .map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* PRICE */}
            <p className="text-center">
              {currency}
              {product.offerPrice * product.quantity}
            </p>

            {/* REMOVE */}
            <button
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer mx-auto"
            >
              <img
                src={assets.remove_icon}
                alt="remove"
                className="inline-block w-6 h-6"
              />
            </button>
          </div>
        ))}

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
            alt="arrow"
            className="group-hover:-translate-x-1 transition"
          />
          Continue Shopping
        </button>
      </div>

      {/* RIGHT */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        {/* ADDRESS */}
        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>

          <div className="relative mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>

            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer"
            >
              Change
            </button>

            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border w-full">
                {addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.country}
                  </p>
                ))}

                <p
                  onClick={() => navigate("/add-address")}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          {/* PAYMENT */}
          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        {/* TOTAL */}
        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>

          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartAmount() * 2) / 100}
            </span>
          </p>

          <p className="flex justify-between">
            <span>Total Amount:</span>
            <span>
              {currency}
              {getCartAmount() + (getCartAmount() * 2) / 100}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 bg-primary text-white hover:bg-primary-dull transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
