import React, { useEffect } from 'react'
import { NavLink } from "react-router-dom"
import { assets } from '../assets/assets';
import { useAppContext } from '../Context/AppContext';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const {
      user,
      setUser,
      setShowUserLogin,
      navigate,
      searchQuery,
      setSearchQuery,
      getCartCount,
      axios
    } = useAppContext();


    const logout = async ()=>{
      try {
        const { data } = await axios.get('/api/user/logout')
        if(data.success){
          toast.success(data.message);
          setUser(null);
          navigate('/')
        }else{
          toast.error(data.message);

        }

      } catch (error) {
        toast.error(error.message);

      }
        
    }

    useEffect(()=>{
      if(searchQuery.length > 0){
        navigate("/products")
      }

    }, [searchQuery])
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md flex items-center justify-between h-[100px] px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img className="h-[120px] w-[120px]" src={assets.logo3} alt="logo2" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/" className="text-gray-600 hover:text-primary-dull">
          Home
        </NavLink>
        <NavLink
          to="/products"
          className="text-gray-600 hover:text-primary-dull"
        >
          All Product
        </NavLink>
        <NavLink
          to="/contact"
          className="text-gray-600 hover:text-primary-dull"
        >
          Contact
        </NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary hover:bg-primary-dull w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              className="w-10 cursor-pointer"
              alt=""
            />

            <ul className="absolute hidden group-hover:block top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-32 rounded-md text-sm z-40">
              <li
                onClick={() => navigate("my-orders")}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex items-center gap-6 sm:hidden">
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary hover:bg-primary-dull w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className=""
        >
          {/* Menu Icon SVG */}
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`${open ? "flex" : "hidden"} absolute top-[100px] fixed  w-full h-[300px] right-0 bg-white rounded-md shadow-lg py-4 flex-col items-center gap-6 px-5 text-sm md:hidden`}
        >
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="text-gray-600 hover:text-primary-dull mt-6"
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setOpen(false)}
            className="text-gray-600 hover:text-primary-dull"
          >
            All Product
          </NavLink>
          {user && (
            <NavLink
              to="/contacts"
              onClick={() => setOpen(false)}
              className="text-gray-600 hover:text-primary-dull"
            >
              My Orders
            </NavLink>
          )}
          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="text-gray-600 hover:text-primary-dull"
          >
            Contact
          </NavLink>
          <div className= "flex items-center justify-end text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
            />
            <img src={assets.search_icon} alt="search" className="w-4 h-4" />
          </div>

          {!user ? (
            <button
              onClick={() => {
                setShowUserLogin(true);
                setOpen(false);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar
