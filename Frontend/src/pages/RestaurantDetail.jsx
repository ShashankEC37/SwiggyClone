import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantByIdAPI } from "../services/api";
import "./RestaurantDetail.css";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurant();
  }, [id]);

  const fetchRestaurant = async () => {
    try {
      const data = await getRestaurantByIdAPI(id);
      setRestaurant(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching restaurant:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="detail-loading">Loading restaurant details...</div>;
  }

  if (!restaurant) {
    return <div className="detail-error">Restaurant not found</div>;
  }

  return (
    <div className="detail-container">
      <div className="detail-header">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="detail-image"
        />
        <div className="detail-info">
          <h2 className="detail-name">{restaurant.name}</h2>
          <p className="detail-cuisine">{restaurant.cuisine.join(", ")}</p>

          <div className="detail-stats">
            <div className="detail-stat">
              <span className="detail-stat-label">Rating</span>
              <span className="detail-rating">⭐ {restaurant.rating}</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-label">Delivery Time</span>
              <span className="detail-stat-value">
                {restaurant.deliveryTime}
              </span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-label">Food Type</span>
              <span className={`detail-food-type ${restaurant.foodType}`}>
                {restaurant.foodType === "veg" ? "🟢 Veg" : "🔴 Non-Veg"}
              </span>
            </div>
          </div>

          <div className="detail-address">
            <h3>Address</h3>
            <p>{restaurant.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
