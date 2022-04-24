import { Router } from "express";
import {
  addToBuy,
  addToCart,
  addToFavourite,
  login,
  register,
} from "../Controllers/AuthController";
import {
  feedback,
  sellCar,
  updateCarData,
} from "../Controllers/BuySellController";
import getRouter from "./Getcalls";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/sell-car", sellCar);
router.post("/add-to-favourite", addToFavourite);
router.post("/add-to-cart", addToCart);
router.post("/add-to-buy", addToBuy);
router.patch("/update-car/:_id", updateCarData);
router.post("/feedback", feedback);
router.use(getRouter);

export default router;
