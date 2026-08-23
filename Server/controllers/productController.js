import { v2 as cloudinary } from "cloudinary"
import { Readable } from "stream";
import Product from "../models/Product.js";

const uploadBufferToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => (result ? resolve(result) : reject(error)),
    );
    Readable.from(buffer).pipe(stream);
  });

// Add Product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);

    const images = req.files;

    if (!images || images.length === 0) {
      return res.json({ success: false, message: "No images uploaded" });
    }

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await uploadBufferToCloudinary(item.buffer);
        return result.secure_url;
      }),
    );

    await Product.create({ ...productData, image: imagesUrl });

    return res.json({ success: true, message: "Product Added" });
    
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
// Get Product : /api/product/list
export const productList = async (req, res)=>{
    try{
        const products = await Product.find({})
        res.json({success: true, products})

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
        
    }


}

// Get single Product : /api/product/id
export const productById = async (req, res)=>{
try {
    const { id } = req.body
    const producs = await Product.findById({id});
    res.json({ success: true, product });

} catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });

}

}

const deleteFromCloudinaryByUrl = async (url) => {
  const match = typeof url === "string" && url.match(/\/upload\/(?:v\d+\/)?([^./]+)\.\w+(?:\?.*)?$/);
  if (!match) return;
  await cloudinary.uploader.destroy(match[1]);
};

// Delete Product : /api/product/delete/:id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    if (Array.isArray(product.image)) {
      await Promise.all(
        product.image.map((url) =>
          deleteFromCloudinaryByUrl(url).catch((error) =>
            console.log("Cloudinary delete failed for", url, ":", error.message),
          ),
        ),
      );
    }

    return res.json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// Change Product inStock : /api/product/stock
export const changeStock = async (req, res)=>{
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, {inStock})
        res.json({ success: true, message: "Stock Updated" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });

    }


}