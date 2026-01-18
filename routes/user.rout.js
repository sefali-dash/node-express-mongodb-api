import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../user.model.js";
import { auth } from "../auth.js";

const router = express.Router();

// / api/users/2
router.get("/:UserId", auth, async (req, res, next) => {
  //req.userId

  const requestUserId = req.params.userId;
  const tokenUserId = req.userId;

  if (requestUserId != tokenUserId) {
    const error = new Error("Not allowed!");
    error.statusCode = 403;
    next(error);
    return;
  }

  const user = await User.findOne(
    { id: requestUserId },
    { password: false, _v: false },
  );

  res.json(user);
});

// /api/User/login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  // const xyz = req.body.email;

  //validate request body

  const user = await User.findOne({
    email,
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 400;
    next(error);
    return;
  }

  const matched = bcrypt.compareSync(password, user.password);
  if (!matched) {
    const error = new Error("Password didn't match");
    error.statusCode = 400;
    next(error);
    return;
  }

  // return res.json({
  //   user,
  //   matched,
  // });

  //json token
  const token = jwt.sign({ id: User._id }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60,
  });

  res.json({ token });
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  //validate request
  if (!name || !email || !password) {
    const error = new Error("all fields are required!");
    error.statusCode = 400;
    next(error);

    //res.status(400).json({ message: "all fields are required" });
    // return;
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("sefali123", salt);
    const result = await User.create({
      name,
      email,
      password: hash,
    });
    res.status(201).json({ id: result._id });
  } catch (err) {
    next(err);
  }

  console.log(result);
  res.status(201).json({ id: result._id });

  console.log(name, email, password);

  res.json({ message: "All okay!" });
});

export default router;
