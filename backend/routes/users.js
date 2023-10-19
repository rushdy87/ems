const express = require('express');

const usersController = require('../controllers/users');

const route = express.Router();

// Signup (/users/signup)
route.post('/signup', usersController.signup);

// Login (/users/signin)
route.post('/signin', usersController.signin);

// Get user by id (/users/id/:id)
route.get('/id/:id', usersController.getUserById);

// Get user by username (/users/usrname/:username)
route.get('/username/:username', usersController.getUserByUsername);

// Get all users (/users)
route.get('/', usersController.fetchAllUsers);

// Update (/users/:id)
route.patch('/:id', usersController.updateUser);

// Delete (/users/:id)
route.delete('/:id', usersController.deleteUser);

module.exports = route;

// Problems need to solve
// 1. Unauthorized person can make a get requist!!!
// 2. Password Hashing (The node:crypto module?!)
