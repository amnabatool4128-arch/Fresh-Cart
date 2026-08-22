import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

// Login Seller :/api/seller/login

export const sellerlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user || user.role !== "seller") {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// seller isAuth : /api/seller/is-auth

export const isSellerAuth = async (req, res)=>{
  try{

    return res.json({success: true})


  } catch (error) {
    console.log(error.message);

    res.json({ success: false, message: error.message });

  }
}

// Logout seller : /api/seller/logout

export const sellerlogout = async (req, res)=>{
  try{
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV ==='production' ? 'none' : 'lax',
    });
    return res.json({ success: true, message: "Logged Out"})
  } catch (error){
    console.log(error.message);

    res.json({ success: false, message: error.message });

  }
}
