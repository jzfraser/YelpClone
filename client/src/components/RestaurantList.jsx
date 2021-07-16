import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = (props) => {
  const {restaurants, setRestaurants} = useContext(RestaurantsContext);
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get('/');
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [setRestaurants]);

  const handleDelete = async (id) => {
    try {
      await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter(restaurant => {
        return restaurant.id !== id;
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (id) => {
    history.push(`/restaurants/${id}/update`);
  };

  const renderListItems = () => {
    return restaurants.map(restaurant => {
      return (
        <tr key={restaurant.id}>
          <td>{restaurant.name}</td>
          <td>{restaurant.location}</td>
          <td>{'$'.repeat(restaurant.price_range)}</td>
          <td><button className="btn btn-warning" onClick={() => handleUpdate(restaurant.id)}>
            Update
          </button></td>
          <td><button className="btn btn-danger" onClick={() => handleDelete(restaurant.id)}>
            Delete
          </button></td>
        </tr>
      );
    })
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark" style={{fontSize: ".922rem"}}>
        <thead>
          <tr className="table-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && renderListItems()}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
