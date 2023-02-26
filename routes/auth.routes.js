const express = require("express");
const bcrypt = require("bcryptjs");
// const { check, validationResult } = require("express-validator");
const tokenService = require("../services/token.service");
const RegUser = require("../models/RegUser");
const router = express.Router({ mergeParams: true });

router.post("/signUp", async (req, res) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({
    //     error: {
    //       message: "INVALID_DATA",
    //       code: 400,
    //     },
    //   });
    // }

    const { email, password } = req.body;

    const exitingUser = await RegUser.findOne({ email });

    if (exitingUser) {
      return res.status(400).json({
        error: {
          message: "EMAIL_EXISTS",
          code: 400,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await RegUser.create({
      ...req.body,
      password: hashedPassword,
    });

    const tokens = tokenService.generate({ _id: newUser._id });
    await tokenService.save(newUser._id, tokens.refreshToken);

    res.status(201).send({ ...tokens, userId: newUser._id });
  } catch (e) {
    console.log("eeeerrrroooorrrr", e);
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/signInWithPassword", async (req, res) => {});
router.post("/token", async (req, res) => {});

module.exports = router;
