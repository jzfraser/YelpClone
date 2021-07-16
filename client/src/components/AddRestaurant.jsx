import React, { useContext, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const { addRestaurants } = useContext(RestaurantsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name: name,
        location: location,
        price_range: priceRange
      });
      addRestaurants(response.data.data.restaurant);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-4">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="col-lg-4">
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Location"
            />
          </div>
          <div className="col-lg-3">
            <select value={priceRange || " "} onChange={e => setPriceRange(e.target.value)}
              className="custom-select my-1">
              <option value=" " disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
