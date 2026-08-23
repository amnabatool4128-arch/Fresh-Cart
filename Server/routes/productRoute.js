import { upload } from '../configs/multer.js';
import express from 'express';
import sellerAuth from '../middlewares/sellerAuth.js';
import { addProduct, changeStock, deleteProduct, productById, productList } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add', upload.array("images"), sellerAuth, addProduct );
productRouter.get('/list', productList)
productRouter.get("/id", productById);
productRouter.post("/stock", sellerAuth, changeStock);
productRouter.delete("/delete/:id", sellerAuth, deleteProduct);

export default productRouter;

