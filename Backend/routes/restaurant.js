const express = require("express");
const router = express.Router();
const Restaurant = require("../model/Restaurant");

router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({
      message: "Get all restaurants",
      restaurants: restaurants,
    });
  } catch (error) {
    console.log("Error Fetching restaurants", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }
    res.status(200).json({
      message: "Get  restaurant successfully",
      restaurant: restaurant,
    });
  } catch (error) {
    console.log("Error Fetching restaurants", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
