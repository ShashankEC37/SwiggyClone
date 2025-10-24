const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Restaurant = require("./model/Restaurant");
const MenuItem = require("./model/MenuItem");

dotenv.config();

const sampleRestaurants = [
  {
    name: "Rameshwaram Cafe",
    image:
      "https://b.zmtcdn.com/data/pictures/2/19911292/8cf509b8019924f642e279e342a5cebc.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*",
    cuisine: ["South Indian", "Breakfast"],
    rating: 4.5,
    deliveryTime: "25-30 mins",
    foodType: "veg",
    address: "Indiranagar, Bangalore",
  },
  {
    name: "Adyar Ananda Bhavan",
    image:
      "https://content3.jdmagicbox.com/v2/comp/chennai/f7/044pxx44.xx44.180926190859.l4f7/catalogue/a2b-veg-restaurant-arumbakkam-chennai-restaurants-o5kc9jre1l.jpg",
    cuisine: ["South Indian", "Sweets"],
    rating: 4.3,
    deliveryTime: "30-35 mins",
    foodType: "veg",
    address: "Jayanagar, Bangalore",
  },
  {
    name: "Corner House",
    image:
      "https://b.zmtcdn.com/data/pictures/3/50313/8ce2870b5b7220ca5bb574ccc7f14508.jpg",
    cuisine: ["Desserts", "Ice Cream"],
    rating: 4.6,
    deliveryTime: "20-25 mins",
    foodType: "veg",
    address: "Koramangala, Bangalore",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://shashank:shashank@cluster0.eyllfv3.mongodb.net/swiggy-clone"
    );
    console.log("MongoDB connected");

    // Clear old data
    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});
    console.log("Old data cleared");

    // Add restaurants
    const restaurants = await Restaurant.insertMany(sampleRestaurants);
    console.log("Sample restaurants added");

    // Menu items for Rameshwaram Cafe
    const rameshwaramMenuItems = [
      {
        restaurantId: restaurants[0]._id,
        name: "Masala Dosa",
        description: "Crispy rice crepe with spiced potato filling",
        price: 120,
        image:
          "https://b.zmtcdn.com/data/dish_photos/6bc/129b10b3e0218790b06d1ff1841bc6bc.jpeg",
        category: "Main Course",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[0]._id,
        name: "Ghee Pudi Idli",
        description: "Steamed rice cakes served with chutney and sambar",
        price: 60,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BKWGS-6Ptfp2UUOtXkG2s_jfafHRVxOHnw&s",
        category: "Breakfast",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[0]._id,
        name: "Idli Vada",
        description: "Combo of steamed idli and crispy vada",
        price: 90,
        image:
          "https://hotelbeachgarden.com/wp-content/uploads/2024/12/Idli-_-Vada-Sambar.webp",
        category: "Breakfast",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[0]._id,
        name: "Rava Idli",
        description: "Soft semolina idlis with cashews",
        price: 70,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUtCTl93A8eSqxyKMaJXB0V7qrVz3Sk7yhlw&s",
        category: "Breakfast",
        foodType: "veg",
      },
      {
        restaurantId: restaurants[0]._id,
        name: "Bisi Bele Bath",
        description:
          "Traditional Karnataka rice dish with lentils and vegetables",
        price: 110,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDqnvuRNNQjf5CEDzpEkKE3o4okAdd_ky9cQ&s",
        category: "Main Course",
        foodType: "veg",
      },
    ];

    // Menu items for Adyar Ananda Bhavan
    const adyarMenuItems = [
      {
        restaurantId: restaurants[1]._id,
        name: "Rasmalai",
        description: "Soft cottage cheese dumplings in sweetened milk",
        price: 80,
        image:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2VABhMJY8CDcoX40LHfRwspbb7BdpvAbtpgC3aQxjjBLljnCnGPcYuk9vOAZ69zsbTy_UWqHWKD8fadOy9JbV3OHZHsu3M7Dh51hAeHrQa-Zj9y5ecBII0n7BPdxqAuF7K5xMOrq5fnY/s1296/Rasmalai+recipe.jpg",
        category: "Desserts",
        foodType: "veg",
      },
    ];

    // Menu items for Corner House
    const cornerHouseMenuItems = [
      {
        restaurantId: restaurants[2]._id,
        name: "Death By Chocolate",
        description: "Rich chocolate ice cream with brownie pieces",
        price: 200,
        image:
          "https://b.zmtcdn.com/data/reviews_photos/9ba/f12b2621ec9228a5abe1822be59b09ba_1481653074.jpg",
        category: "Desserts",
        foodType: "veg",
      },
    ];

    await MenuItem.insertMany([
      ...rameshwaramMenuItems,
      ...adyarMenuItems,
      ...cornerHouseMenuItems,
    ]);
    console.log("Sample menu items added");

    mongoose.connection.close();
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
};

seedDB();
