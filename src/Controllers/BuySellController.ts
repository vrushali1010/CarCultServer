import { RequestHandler, Response } from "express";
import { SellCarInterface, SignupInterface } from "../Model/Models";
import { signupModel } from "../Routes/AuthModel";
import { feedbackModel } from "../Routes/FeedbackModel";
import { sellModel } from "../Routes/SellModel";

const resturnRes = (err: any, result: SellCarInterface, res: Response) => {
  if (err) {
    res.status(500).send(err);
  } else if (result) {
    res.status(201).send(result);
  } else {
    res.send([]);
  }
};
export const sellCar: RequestHandler = (req, res, next) => {
  const newCarToSell = new sellModel(req.body);
  newCarToSell
    .save()
    .then((carToSell: SellCarInterface) => res.status(201).send(carToSell))
    .catch((err: any) => {
      res.status(400).send(err);
    });
};

export const buyNewCar: RequestHandler = (req, res, next) => {
  sellModel.find(
    { year: new Date().getFullYear(), sellStatus: false },
    (err: any, result: SellCarInterface) => {
      resturnRes(err, result, res);
    }
  );
};

export const buyOldCar: RequestHandler = (req, res, next) => {
  sellModel.find(
    { year: { $ne: new Date().getFullYear() }, sellStatus: false },
    (err: any, result: SellCarInterface) => {
      resturnRes(err, result, res);
    }
  );
};

export const getFavouriteCars: RequestHandler = (req, res, next) => {
  const { email } = req.params;
  signupModel.findOne({ email }, (err: any, foundUser: SignupInterface) => {
    if (err) {
      res.status(500).send(err);
    } else if (!foundUser) {
      res.status(404).send("Email not found");
    } else {
      sellModel.find(
        { _id: { $in: foundUser.favourites } },
        (error: any, result: SellCarInterface) => {
          resturnRes(error, result, res);
        }
      );
    }
  });
};

export const getCartCars: RequestHandler = (req, res, next) => {
  const { email } = req.params;
  signupModel.findOne({ email }, (err: any, foundUser: SignupInterface) => {
    if (err) {
      res.status(500).send(err);
    } else if (!foundUser) {
      res.status(404).send("Email not found");
    } else {
      sellModel.find(
        { _id: { $in: foundUser.cart } },
        (error: any, result: SellCarInterface) => {
          resturnRes(error, result, res);
        }
      );
    }
  });
};

export const getBuyList: RequestHandler = (req, res, next) => {
  const { _id } = req.params;
  signupModel.findById(_id, (err: any, foundUser: SignupInterface) => {
    if (err) {
      res.status(500).send(err);
    } else if (!foundUser) {
      res.status(404).send("Invalid ID");
    } else {
      sellModel.find(
        { _id: { $in: foundUser.buy } },
        (error: any, result: SellCarInterface) => {
          resturnRes(error, result, res);
        }
      );
    }
  });
};

export const getSellList: RequestHandler = (req, res, next) => {
  const { _id } = req.params;
  sellModel.find({ sellerId: _id }, (err: any, result: SellCarInterface) => {
    if (err) {
      res.status(500).send(err);
    } else if (result) {
      res.status(200).send(result);
    }
  });
};

export const updateCarData: RequestHandler = (req, res, next) => {
  const { _id } = req.params;
  sellModel.findByIdAndUpdate(
    _id,
    req.body,
    (err: any, result: SellCarInterface) => {
      if (err) {
        res.status(500).send(err);
      } else if (result) {
        res.status(200).send(result);
      }
    }
  );
};
export const getSiteData: RequestHandler = async (req, res, next) => {
  const totalSells = await sellModel.find({ sellStatus: true }).count();
  const totalRegisteredCars = await sellModel.find().count();
  const totalRegisteredUsers = await signupModel.find().count();
  res
    .status(200)
    .send({ totalSells, totalRegisteredCars, totalRegisteredUsers });
};

export const feedback: RequestHandler = (req, res, next) => {
  const newFeedback = new feedbackModel(req.body);
  newFeedback
    .save()
    .then((feedback: any) => {
      res.status(201).send(feedback);
    })
    .catch((err: any) => {
      res.status(400).send(err);
    });
};
