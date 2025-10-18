const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Restaurant = require("./model/Restaurant");

dotenv.config();

const sampleRestaurants = [
  {
    name: "Rameshwaram Cafe",
    image:
      "https://imagesvs.oneindia.com/webp/img/2024/03/rameshwaram-cafe-small-1709296213.jpg",
    cuisine: ["North Indian", "Punjabi"],
    rating: 4.2,
    deliveryTime: "30-35 mins",
    foodType: "non-veg",
    address: "MG Road, Bangalore",
  },
  {
    name: "Taaza Tindi",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/09/81/82/2c/taaza-thindi.jpg",
    cuisine: ["South Indian", "Breakfast"],
    rating: 4.5,
    deliveryTime: "20-25 mins",
    foodType: "veg",
    address: "Jayanagar, Bangalore",
  },
  {
    name: "Chinese Wok",
    image:
      "https://b.zmtcdn.com/data/pictures/chains/3/19715673/3f7169f6d33d972e3e1997096638babb.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*",
    cuisine: ["Chinese", "Asian"],
    rating: 4.0,
    deliveryTime: "35-40 mins",
    foodType: "non-veg",
    address: "Koramangala, Bangalore",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://shashank:shashank@cluster0.eyllfv3.mongodb.net/swiggy-clone"
    );
    console.log("MongoDB connected");

    await Restaurant.insertMany(sampleRestaurants);
    console.log("Sample restaurants added");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
  }
};

seedDB();
