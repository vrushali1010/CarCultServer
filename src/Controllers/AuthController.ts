import { RequestHandler } from "express";
import { signupModel } from "../Routes/AuthModel";
import { SellCarInterface, SignupInterface } from "../Model/Models";
import bcrypt from "bcrypt";
import { sellModel } from "../Routes/SellModel";
import { createTransport } from "nodemailer";
var sendgridTransport = require("nodemailer-sendgrid-transport");

const saltRounds = 10;

const transporter = createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

export const login: RequestHandler = (req, res, next) => {
  const user: SignupInterface = new signupModel(req.body);
  signupModel.findOne(
    { email: user.email },
    (err: any, foundUser: SignupInterface) => {
      if (err) {
        res.status(500).send(err);
      } else if (!foundUser) {
        res.status(404).send("Email not found");
      } else {
        bcrypt.compare(user.password, foundUser.password, (error, result) => {
          if (result) {
            res.send(foundUser);
          } else {
            res.status(400).send("Password mismatch");
          }
        });
      }
    }
  );
};

export const register: RequestHandler = (req, res, next) => {
  const newUser = new signupModel(req.body);
  bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
    newUser.password = hash;
    newUser
      .save()
      .then((user: SignupInterface) => res.status(201).send(user))
      .catch((error: any) => {
        res.status(400).send(error);
      });
  });
};

export const addToFavourite: RequestHandler = (req, res, next) => {
  const { id, email } = req.body;
  signupModel.findOne({ email }, (err: any, foundUser: SignupInterface) => {
    if (err) {
      res.status(500).send(err);
    } else if (foundUser) {
      let tempArr = foundUser.favourites;
      if (tempArr.includes(id)) {
        tempArr = tempArr.filter((item) => item !== id);
      } else {
        tempArr.push(id);
      }
      signupModel.findOneAndUpdate(
        { email },
        { favourites: tempArr },
        (err: any, result: SignupInterface) => {
          if (err) {
            res.status(500).send(err);
          } else if (result) {
            res.send(result);
          } else {
            res.send([]);
          }
        }
      );
    }
  });
};

export const favouriteCars: RequestHandler = (req, res, next) => {
  const { email } = req.params;
  signupModel.findOne({ email }, (err: any, foundUser: SignupInterface) => {
    if (err) {
      res.status(500).send(err);
    } else if (foundUser) {
      res.send(foundUser.favourites);
    } else {
      res.send([]);
    }
  });
};

export const addToCart: RequestHandler = (req, res, next) => {
  const { id, email } = req.body;
  signupModel.findOne({ email }, (err: any, foundUser: SignupInterface) => {
    if (err) {
      res.status(500).send(err);
    } else if (foundUser) {
      let tempArr = foundUser.cart;
      if (tempArr.includes(id)) {
        tempArr = tempArr.filter((item) => item !== id);
      } else {
        tempArr.push(id);
      }
      signupModel.findOneAndUpdate(
        { email },
        { cart: tempArr },
        (err: any, result: SignupInterface) => {
          if (err) {
            res.status(500).send(err);
          } else if (result) {
            res.send(result);
          } else {
            res.send([]);
          }
        }
      );
    }
  });
};

export const addToBuy: RequestHandler = (req, res) => {
  const { id, email } = req.body;
  sellModel.findByIdAndUpdate(
    id,
    { sellStatus: true },
    (err: any, result: SellCarInterface) => {
      if (err) {
        res.status(400).json(err);
      } else {
        signupModel.findById(
          result.sellerId,
          (err: any, foundUser: SignupInterface) => {
            if (err) {
              res.status(500).send(err);
            } else if (foundUser) {
              let tempArr = foundUser.sell;
              if (tempArr.includes(id)) {
                tempArr = tempArr.filter((item) => item !== id);
              } else {
                tempArr.push(id);
              }
              transporter.sendMail({
                to: foundUser.email,
                from: "sduqiygh@hi2.in",
                subject: "Car Sold",
                html: `<h1>Car Sold</h1>`,
              });
              signupModel.findByIdAndUpdate(
                result.sellerId,
                { sell: tempArr },
                (err: any, result: SignupInterface) => {
                  if (err) {
                    res.status(500).send(err);
                  }
                }
              );
            }
          }
        );
      }
    }
  );
  signupModel.findOne({ email }, (err: any, foundUser: SignupInterface) => {
    if (err) {
      res.status(500).send(err);
    } else if (foundUser) {
      let tempArr = foundUser.buy;
      let tempArr1 = foundUser.cart;
      if (tempArr1.includes(id)) {
        tempArr1 = tempArr1.filter((item) => item !== id);
      }
      if (tempArr.includes(id)) {
        tempArr = tempArr.filter((item) => item !== id);
      } else {
        tempArr.push(id);
      }
      transporter.sendMail({
        to: email,
        from: "sduqiygh@hi2.in",
        subject: "Car Bought",
        html: `<h1>Car Bought</h1>`,
      });
      signupModel.findOneAndUpdate(
        { email },
        { buy: tempArr, cart: tempArr1 },
        (err: any, result: SignupInterface) => {
          if (err) {
            res.status(500).send(err);
          } else if (result) {
            res.send(result);
          } else {
            res.send([]);
          }
        }
      );
    }
  });
};

export const getCart: RequestHandler = (req, res, next) => {
  const { email } = req.params;
  signupModel.findOne({ email }, (err: any, foundUser: SignupInterface) => {
    if (err) {
      res.status(500).send(err);
    } else if (foundUser) {
      res.send(foundUser.cart);
    } else {
      res.send([]);
    }
  });
};
