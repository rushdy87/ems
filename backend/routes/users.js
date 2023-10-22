const express = require('express');

const usersController = require('../controllers/users');

const route = express.Router();

// Signup (/users/signup)
route.post('/signup', usersController.signup);

// Login (/users/signin)
route.post('/signin', usersController.signin);

// Get user by id (/users/id/:id)
route.get('/id/:id', usersController.getUserById);

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
// 3. Change in Database (adding default value for authorization_level)
// 4. add default avatar
