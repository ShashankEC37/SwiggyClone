const express = require("express");
const router = express.Router();
const MenuItem = require("../model/MenuItem");

router.get("/restaurant/:restaurantId", async (req, res) => {
  try {
    const menuItem = await MenuItem.find({
      restaurantId: req.params.id,
    });
    res.status.apply(200).json(menuItem);
  } catch (error) {
    console.log("Failed to fetch menuItem", error);
  }
});

module.exports = router;
