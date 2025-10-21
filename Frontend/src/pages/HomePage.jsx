import React, { useState, useEffect } from "react";
import { getRestaurantsAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const data = await getRestaurantsAPI();
      setRestaurants(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading restaurants...</div>;
  }

  return (
    <div className="home-container">
      <h2>Restaurants Near You</h2>
      {restaurants.length === 0 ? (
        <p className="no-restaurants">No restaurants available</p>
      ) : (
        <div className="restaurant-grid">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="restaurant-card"
              onClick={() => navigate(`/restaurant/${restaurant._id}`)}
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="restaurant-image"
              />
              <div className="restaurant-info">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <p className="restaurant-cuisine">
                  {restaurant.cuisine.join(", ")}
                </p>
                <div className="restaurant-details">
                  <span className="rating">⭐ {restaurant.rating}</span>
                  <span>{restaurant.deliveryTime}</span>
                  <span className={`food-type ${restaurant.foodType}`}>
                    {restaurant.foodType === "veg" ? "🟢 Veg" : "🔴 Non-Veg"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
