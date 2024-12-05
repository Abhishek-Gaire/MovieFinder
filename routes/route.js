const express = require("express");
const router = express.Router();

const controllers = require("../controllers/pageController");

router.get("/", controllers.getIndex);
router.get("/movie/:id", controllers.getDetails);
router.post("/search", controllers.searchMovie);

module.exports = router;
