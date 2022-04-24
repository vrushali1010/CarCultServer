import { Router } from "express";
import { favouriteCars, getCart } from "../Controllers/AuthController";
import {
  buyNewCar,
  buyOldCar,
  getBuyList,
  getCartCars,
  getFavouriteCars,
  getSellList,
  getSiteData,
} from "../Controllers/BuySellController";

const getRouter = Router();

getRouter.get("/favourite-cars/:email", favouriteCars);
getRouter.get("/get-favorite-cars/:email", getFavouriteCars);
getRouter.get("/cart/:email", getCart);
getRouter.get("/get-cart-cars/:email", getCartCars);
getRouter.get("/buy-new-car", buyNewCar);
getRouter.get("/buy-old-car", buyOldCar);
getRouter.get("/get-buy-list/:_id", getBuyList);
getRouter.get("/get-sell-list/:_id", getSellList);
getRouter.get("/get-site-data", getSiteData);

export default getRouter;
