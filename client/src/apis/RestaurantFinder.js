import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3069/api/v1/restaurants'
});