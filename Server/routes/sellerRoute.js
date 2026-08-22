

import express from 'express';
import { isSellerAuth, sellerlogin, sellerlogout } from '../controllers/sellerController.js';
import sellerAuth from '../middlewares/sellerAuth.js';

const sellerRouter = express.Router();

sellerRouter.post('/login', sellerlogin)
sellerRouter.get("/is-auth",sellerAuth, isSellerAuth);
sellerRouter.get("/logout", sellerlogout);

export default sellerRouter;


