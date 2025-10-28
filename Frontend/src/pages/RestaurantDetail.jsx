import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantByIdAPI, getMenuItemsAPI } from "../services/api";
import "./RestaurantDetail.css";
import { useCart } from "../context/CartContext";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedItemId, setAddedItemId] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    fetchRestaurantAndMenu();
  }, [id]);

  const fetchRestaurantAndMenu = async () => {
    try {
      const restaurantData = await getRestaurantByIdAPI(id);
      const menuData = await getMenuItemsAPI(id);

      setRestaurant(restaurantData);
      setMenuItems(menuData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!restaurant) {
    return <div className="detail-error">Restaurant not found</div>;
  }

  return (
    <div className="detail-container page-transition">
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

      <div className="menu-section">
        <h2>Menu</h2>
        {menuItems.length === 0 ? (
          <p>No menu items available</p>
        ) : (
          <div className="menu-grid">
            {menuItems.map((item) => (
              <div key={item._id} className="menu-item-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="menu-item-image"
                />
                <div className="menu-item-info">
                  <div className="menu-item-header">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <span className={`menu-food-type ${item.foodType}`}>
                      {item.foodType === "veg" ? "🟢" : "🔴"}
                    </span>
                  </div>
                  <p className="menu-item-description">{item.description}</p>
                  <div className="menu-item-footer">
                    <span className="menu-item-price">₹{item.price}</span>
                    <div
                      className="add-button"
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("Adding to cart:", item.name);
                        addToCart({ ...item, restaurantId: restaurant._id });
                        setAddedItemId(item._id);
                        setTimeout(() => setAddedItemId(null), 2000);
                      }}
                    >
                      {addedItemId === item._id ? "Added ✓" : "Add"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;
