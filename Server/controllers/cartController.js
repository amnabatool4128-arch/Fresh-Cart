import User from "../models/User.js";

// update cart
export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartItems } = req.body;

    await User.findByIdAndUpdate(userId, {
      $set: { cartItems },
    });

    res.json({
      success: true,
      message: "Cart Updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ ADD THIS (MISSING PART)
export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    res.json({
      success: true,
      cartItems: user.cartItems || {},
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
