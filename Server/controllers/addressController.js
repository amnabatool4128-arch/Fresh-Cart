import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.user.id;

    if (!address) {
      return res.json({
        success: false,
        message: "Address details are required",
      });
    }

    const newAddress = await Address.create({
      ...address,
      userId,
    });

    res.json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
    });
  } catch (error) {
    console.log("ADD ADDRESS ERROR:", error.message);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const addresses = await Address.find({ userId });

    res.json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.log("GET ADDRESS ERROR:", error.message);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
