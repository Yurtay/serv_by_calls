const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userId", userId);
    console.log("req.user._id", req.user._id);
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.send(updatedUser);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const deleteUser = await User.findById(userId);
    console.log("deleteUser", deleteUser);
    await deleteUser.remove();
    res.send(null);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
