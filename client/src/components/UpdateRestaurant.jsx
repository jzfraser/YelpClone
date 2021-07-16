import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        const restaurant = response.data.data.restaurant;
        setName(restaurant.name);
        setLocation(restaurant.location);
        setPriceRange(restaurant.price_range);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setName, setLocation, setPriceRange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await RestaurantFinder.put(`/${id}`, {
      name: name,
      location: location,
      price_range: priceRange
    });
    history.push('/');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            className="form-control"
            type="text" 
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            value={location}
            className="form-control"
            type="text" 
            onChange={e => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <select
            value={priceRange || " "}
            onChange={e => setPriceRange(e.target.value)}
            className="custom-select my-1"
          >
            <option value=" " disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;