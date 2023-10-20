const bcrypt = require('bcrypt');
const Users = require('../models/users');
const users = [
  {
    id: 1,
    username: 'username',
    password: 'password',
    authorization_level: 1,
  },
];

// Sign up
exports.signup = async (req, res, next) => {
  try {
    const { user } = req.body;

    // Check if required fields are missing.
    if (!user.username || !user.password || !user.confirmPassword) {
      return res.status(400).json({
        error:
          'Missing required fields: username, password, or confirmPassword.',
      });
    }

    // Check if the password and confirmPassword match.
    if (user.password !== user.confirmPassword) {
      return res.status(400).json({
        error: 'Password confirmation does not match.',
      });
    }

    // Hash the password before saving it to the database.
    const hashedPassword = await bcrypt.hash(user.password, 10); // 10 is the number of salt rounds.

    // Create a new user in the database.
    const newUser = await Users.create({ ...user, password: hashedPassword });

    if (!newUser) {
      // Handle database error specifically if user creation fails.
      return res.status(500).json({ error: 'Failed to create a new user.' });
    }

    // Successful user creation.
    return res.status(201).json({
      message: 'User successfully created.',
      user: newUser,
    });
  } catch (error) {
    console.error(error);

    // Handle unexpected errors with a generic message.
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Sign in
exports.signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if required fields are missing.
    if (!username || !password) {
      return res.status(400).json({
        error: 'Missing required fields: username or password.',
      });
    }

    // Find the user based on the username in the database.
    const user = await Users.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({
        error: 'Wrong username or password.',
      });
    }

    // Compare the hashed password with the provided password.
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        error: 'Wrong username or password.',
      });
    }

    // Successful user sign-in.
    return res.status(200).json({
      message: 'User successfully signed in.',
      user,
    });
  } catch (error) {
    console.error(error);

    // Handle unexpected errors with a generic message.
    res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await Users.findByPk(id);

    if (!user) {
      // User not found - return a 404 response.
      return res.status(404).json({
        error: 'User not found.',
      });
    }

    // Successful user retrieval.
    return res.status(200).json({
      message: 'User found successfully.',
      user,
    });
  } catch (error) {
    console.error(error);

    // Handle unexpected errors with a generic message.
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Maybe I don't need this controller!!
// get user by username
// exports.getUserByUsername = (req, res, next) => {
//   const { username } = req.params;

//   const user = users.find((u) => u.username === username);

//   if (!user) {
//     return res.status(404).json({ message: 'User not Found!' });
//   }
//   res.status(200).json(user);
// };

// Fetch all users
exports.fetchAllUsers = async (req, res, next) => {
  try {
    const users = await Users.findAll();

    if (users.length === 0) {
      // No users found - return a 404 response.
      return res.status(404).json({
        error: 'No users found.',
      });
    }

    // Successful users retrieval.
    return res.status(200).json({
      message: 'Users found successfully.',
      users,
    });
  } catch (error) {
    console.error(error);

    // Handle unexpected errors with a generic message.
    res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newData } = req.body;

    const user = await Users.findByPk(id);

    if (!user) {
      // User not found - return a 404 response with a specific message.
      return res.status(404).json({ error: 'User not found.' });
    }

    // Update only allowed properties in user data.
    const allowedProperties = [
      'username',
      'name',
      'password',
      'authorization_level',
      'avatar',
    ];
    Object.keys(newData).forEach((key) => {
      if (allowedProperties.includes(key)) {
        user[key] = newData[key];
      }
    });

    await user.save();

    // Successful user update.
    return res.status(200).json({
      message: 'User updated successfully.',
      user,
    });
  } catch (error) {
    console.error(error);

    // Handle unexpected errors with a generic message.
    res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await Users.findByPk(id);

    if (!user) {
      // User not found - return a 404 response with a specific message.
      return res.status(404).json({ error: 'User not found.' });
    }

    const deletionResult = await Users.destroy({
      where: { id },
    });

    if (deletionResult === 1) {
      // The deletion was successful (1 row affected)
      return res.status(204).send();
    } else {
      // The deletion did not affect any rows (user not found)
      return res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error(error);

    // Handle unexpected errors with a generic message.
    res.status(500).json({ error: 'Internal server error.' });
  }
};
