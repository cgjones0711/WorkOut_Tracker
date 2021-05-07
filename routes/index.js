const router = require("express").Router();

const apiRoutes = require("./api");
const htmlRoutes = require("./htmlRoutes");
const statsRoutes = require("./stats");
const exerciseRoutes = require("./exercise");

router.use("/", htmlRoutes);
router.use("/api", apiRoutes);
router.use("/stats", statsRoutes);
router.use("/exercise", exerciseRoutes);

module.exports = router;
