const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/call", require("./call.routes"));
router.use("/user", require("./user.routes"));
router.use("/reguser", require("./reguser.routes"));

module.exports = router;
