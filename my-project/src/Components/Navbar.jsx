import React, { useEffect } from 'react'
import { NavLink } from "react-router-dom"
import { FiSun, FiMoon } from "react-icons/fi"
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
      axios,
      theme,
      toggleTheme,
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
  const navLinkClass = ({ isActive }) =>
    `relative py-1 text-[15px] text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-primary after:transition-all ${
      isActive ? "text-gray-900 dark:text-white font-medium after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `w-full text-left py-3 border-b border-gray-100 dark:border-slate-800 transition-colors ${
      isActive ? "text-primary font-medium" : "text-gray-600 dark:text-slate-300"
    }`;

  const ThemeToggle = ({ className = "" }) => (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors ${className}`}
    >
      {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-slate-900 flex items-center justify-between h-[84px] px-6 md:px-16 lg:px-24 xl:px-32 border-b border-gray-100 dark:border-slate-800">
      <NavLink to="/" onClick={() => setOpen(false)} className="shrink-0">
        <img className="h-10 md:h-11 w-auto" src={assets.logo3} alt="logo2" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-10">
        <div className="flex items-center gap-8">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/products" className={navLinkClass}>
            All Product
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </div>

        <div className="hidden lg:flex items-center text-sm gap-2 bg-surface/70 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-3.5 py-2 rounded-lg focus-within:border-primary/50 transition-colors w-56">
          <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-50 shrink-0 dark:invert" />
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none placeholder-gray-400 dark:placeholder-slate-500 text-gray-700 dark:text-slate-100"
            type="text"
            placeholder="Search products"
          />
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <img
              src={assets.nav_cart_icon}
              alt="cart"
              className="w-6 opacity-80 dark:invert"
            />
            <span className="absolute -top-1.5 -right-2 flex items-center justify-center text-[10px] font-medium leading-none text-white bg-primary w-[17px] h-[17px] rounded-full">
              {getCartCount()}
            </span>
          </div>

          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition-colors text-white rounded-lg font-medium text-sm"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <img
                src={assets.profile_icon}
                className="w-9 h-9 rounded-full cursor-pointer"
                alt=""
              />

              {/* top-9 + pt-2 keeps this flush against the avatar (no dead zone the
                  cursor can slip through) while pt-2 preserves the original visual
                  gap above the menu, so group-hover never drops between the two. */}
              <div className="absolute hidden group-hover:block top-9 right-0 pt-2 w-40 z-40">
                <ul className="bg-white dark:bg-slate-800 shadow-card-hover ring-1 ring-gray-100 dark:ring-slate-700 py-1.5 rounded-lg text-sm overflow-hidden">
                  <li
                    onClick={() => navigate("my-orders")}
                    className="px-4 py-2.5 text-gray-700 dark:text-slate-200 hover:bg-surface dark:hover:bg-slate-700 cursor-pointer transition-colors"
                  >
                    My Orders
                  </li>
                  <li
                    onClick={logout}
                    className="px-4 py-2.5 text-gray-700 dark:text-slate-200 hover:bg-surface dark:hover:bg-slate-700 cursor-pointer transition-colors"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 sm:hidden">
        <ThemeToggle />

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer p-1"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80 dark:invert"
          />
          <span className="absolute top-0.5 -right-0.5 flex items-center justify-center text-[10px] font-medium leading-none text-white bg-primary w-[17px] h-[17px] rounded-full">
            {getCartCount()}
          </span>
        </div>

        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          {/* Menu Icon SVG */}
          <img src={assets.menu_icon} alt="" className="dark:invert" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="flex absolute top-[84px] left-0 w-full bg-white dark:bg-slate-900 shadow-card-hover py-5 flex-col items-stretch gap-1 px-6 text-sm md:hidden border-t border-gray-100 dark:border-slate-800 animate-[fadeIn_0.15s_ease-out]"
        >
          <NavLink to="/" className={mobileNavLinkClass} onClick={() => setOpen(false)} end>
            Home
          </NavLink>
          <NavLink to="/products" className={mobileNavLinkClass} onClick={() => setOpen(false)}>
            All Product
          </NavLink>
          {user && (
            <NavLink to="/contacts" className={mobileNavLinkClass} onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}
          <NavLink to="/contact" className={mobileNavLinkClass} onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          <div className="flex items-center w-full text-sm gap-2 bg-surface/70 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-3.5 py-2.5 rounded-lg mt-4">
            <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-50 shrink-0 dark:invert" />
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none placeholder-gray-400 dark:placeholder-slate-500 dark:text-slate-100"
              type="text"
              placeholder="Search products"
            />
          </div>

          {!user ? (
            <button
              onClick={() => {
                setShowUserLogin(true);
                setOpen(false);
              }}
              className="cursor-pointer w-full px-6 py-3 mt-3 bg-primary hover:bg-primary-dull transition-colors text-white rounded-lg text-sm font-medium"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer w-full px-6 py-3 mt-3 bg-primary hover:bg-primary-dull transition-colors text-white rounded-lg text-sm font-medium"
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
