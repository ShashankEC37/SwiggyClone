import React, { useState, useEffect } from "react";
import { getRestaurantsAPI } from "../services/api";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

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
    return <div>Loading restaurants...</div>;
  }

  return (
    <div>
      <h2>Restaurants</h2>
      {restaurants.length === 0 ? (
        <p>No restaurants available</p>
      ) : (
        <div>
          {restaurants.map((restaurant) => (
            <div key={restaurant._id}>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.cuisine.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
