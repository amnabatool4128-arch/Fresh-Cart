import React from "react";
import { useAppContext } from "../../Context/AppContext";
import { assets } from "../../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import toast from "react-hot-toast";



const SellerLayout = () => {
const { axios, navigate, theme, toggleTheme } = useAppContext();


   

    
    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];
    const logout = async ()=>{
        try {
          const { data } = await axios.get('/api/seller/logout')
          if(data.success){
            toast.success(data.message)
            navigate('/')
          }else{
            toast.error(data.message)
          }

        } catch (error) {
          toast.error(error.message)

        }

    }

    return (
      <>
        <div
          className="flex items-center justify-between px-4 md:px-8 border-b border-gray-200 dark:border-slate-700
             py-3 bg-white dark:bg-slate-900"
        >
          <Link to="/">
            <img
              className="h-[50px] w-[50px] cursor-pointer md:w-38"
              src={assets.logo3}
              alt="Logo"
            />
          </Link>
          <div className="flex items-center gap-4 text-gray-500 dark:text-slate-400">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors"
            >
              {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <p>Hi! Admin</p>
            <button
              onClick={logout}
              className="border border-gray-300 dark:border-slate-600 rounded-full text-sm px-4 py-1 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="md:w-64 w-16 border-r border-gray-200 dark:border-slate-700 h-[95vh] text-base pt-4 flex flex-col bg-white dark:bg-slate-900">
            {sidebarLinks.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                end={item.path === "/seller"}
                className={({ isActive }) => `flex items-center py-3 px-4 gap-3
                            ${
                              isActive
                                ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                : "hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-400 border-white dark:border-slate-900"
                            }`}
              >
                <img src={item.icon} alt="" className="w-7 h-7 dark:invert" />
                <p className="md:block hidden text-center">{item.name}</p>
              </NavLink>
            ))}
          </div>
          <Outlet />
        </div>
      </>
    );
};
export default SellerLayout;