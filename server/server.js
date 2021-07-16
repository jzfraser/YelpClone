require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use((req, res, next) => {
    console.log('Processing request');
    next();
});

app.use(express.json());

// get one restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
    if (typeof req.params.id !== 'number') {
        console.log('Bad restaurant id in request');
        res.status(400);
    }
    try {
        const query = 'SELECT * FROM restaurants WHERE id = $1';
        const values = [req.params.id];
        const results = await db.query(query, values);
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {restaurant: results.rows[0]}
        });
    } catch (err) {
        console.log(err);
    }
});

// get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM restaurants');
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

// create restaurant
app.post('/api/v1/restaurants', async (req, res) => {
    try {
        const query = 'INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *';
        const values = [req.body.name, req.body.location, req.body.price_range];
        const results = await db.query(query, values);
        res.status(201).json({
            status: 'success',
            data: {
                restaurant: results.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

// update restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const query = 'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *';
        const values = [req.body.name, req.body.location, req.body.price_range, req.params.id];
        const results = await db.query(query, values);
        res.status(200).json({
            status: 'success',
            data: {
                restaurant: results.rows[0]
            }
        }); 
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

// delete restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const query = 'DELETE FROM restaurants WHERE id = $1';
        const values = [req.params.id];
        const results = await db.query(query, values);
        res.status(200).json({
            status: 'success'
        });
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
