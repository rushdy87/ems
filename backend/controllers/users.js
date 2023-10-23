const bcrypt = require('bcrypt'); //A library to help you hash passwords.
const Users = require('../models/users');

const { handleResponse } = require('../utils/helper/handle-response');

// Sign up
exports.signup = async (req, res, next) => {
  try {
    const { user } = req.body;

    // Check if required fields are missing.
    if (!user.username || !user.password || !user.confirmPassword) {
      return handleResponse(res, {
        error:
          'Missing required fields: username, password, or confirmPassword.',
        statusCode: 400,
      });
    }

    // Check if the password and confirmPassword match.
    if (user.password !== user.confirmPassword) {
      return handleResponse(res, {
        error: 'Password confirmation does not match.',
        statusCode: 400,
      });
    }

    const userExist = Users.findOne({ where: { username: user.username } });
    if (userExist) {
      return handleResponse(res, {
        error: 'A user with this username already exists',
        statusCode: 400,
      });
    }

    // Hash the password before saving it to the database.
    const hashedPassword = await bcrypt.hash(user.password, 10); // 10 is the number of salt rounds.

    // Create a new user in the database.
    const newUser = await Users.create({ ...user, password: hashedPassword });

    if (!newUser) {
      return handleResponse(res, {
        error: 'Failed to create a new user.',
        statusCode: 500,
      });
    }

    // Successful user creation.
    return handleResponse(res, {
      message: 'User successfully created.',
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        authorization_level: newUser.authorization_level,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};

// Sign in
exports.signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if required fields are missing.
    if (!username || !password) {
      return handleResponse(res, {
        error: 'Missing required fields: username or password.',
        statusCode: 400,
      });
    }

    // Find the user based on the username in the database.
    const user = await Users.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return handleResponse(res, {
        error: 'Wrong username or password.',
        statusCode: 400,
      });
    }

    // Successful user sign-in.
    return handleResponse(res, {
      message: 'User successfully signed in.',
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        authorization_level: user.authorization_level,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await Users.findByPk(id);

    if (!user) {
      return handleResponse(res, {
        error: 'User not found.',
        statusCode: 404,
      });
    }

    // Successful user retrieval.
    return handleResponse(res, {
      message: 'User found successfully.',
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        authorization_level: user.authorization_level,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    return handleResponse(res, { error }, 500);
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
      return handleResponse(res, {
        error: 'No users found.',
        statusCode: 404,
      });
    }

    // Successful users retrieval.
    return handleResponse(res, {
      message: 'Users found successfully.',
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        authorization_level: user.authorization_level,
        avatar: user.avatar,
      })),
    });
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newData } = req.body;

    const user = await Users.findByPk(id);

    if (!user) {
      return handleResponse(res, {
        error: 'User not found.',
        statusCode: 404,
      });
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
    return handleResponse(res, {
      message: 'User updated successfully.',
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        authorization_level: user.authorization_level,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await Users.findByPk(id);

    if (!user) {
      return handleResponse(res, {
        error: 'User not found.',
        statusCode: 404,
      });
    }

    const deletionResult = await Users.destroy({
      where: { id },
    });

    if (deletionResult === 1) {
      // The deletion was successful (1 row affected)
      return res.status(204).send();
    } else {
      // The deletion did not affect any rows (user not found)
      return handleResponse(res, {
        error: 'User not found.',
        statusCode: 404,
      });
    }
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};
