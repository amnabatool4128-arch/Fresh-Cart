import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import { Toaster } from 'react-hot-toast'
import Footer from './Components/Footer'
import { useAppContext } from './Context/AppContext'
import Login from './Components/Login'
import AllProducts from './Components/AllProducts'
import ProductCategory from './Pages/ProductCategory'
import ProductDetails from './Pages/ProductDetails'
import Cart from './Pages/Cart'
import AddAddress from './Pages/AddAddress'
import MyOrders from './Pages/MyOrders'
import SellerLogin from './Components/Seller/SellerLogin'
import SellerLayout from './Pages/Seller/SellerLayout'
import AddProduct from './Pages/Seller/AddProduct'
import ProductList from './Pages/Seller/ProductList'
import Orders from './Pages/Seller/Orders'
import Loading from './Components/Loading'
import Contact from "./Pages/Contact";


const App = () => {

  const isSellerPath = useLocation().pathname.includes("seller")
  const {showUserLogin, isSeller} = useAppContext()
  return (
    <div className="text-default min-h-screen text-gray-700 bg-white pt-[100px]">
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}

      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#fff",
              color: "#374151",
            },
            iconTheme: {
              primary: "#FF8F00",
              secondary: "#FFF",
            },
          },
        }}
      />

      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"} `}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/contact/" element={<Contact />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/loader" element={<Loading />} />
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App
