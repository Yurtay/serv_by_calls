const express = require("express");
const router = express.Router({ mergeParams: true });
const RegUser = require("../models/RegUser");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, async (req, res) => {
  try {
    const regUser = await RegUser.find();
    res.status(200).send(regUser);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

router.get("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await RegUser.findById(userId);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
