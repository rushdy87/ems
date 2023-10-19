const users = [
  {
    id: 1,
    username: 'username',
    password: 'password',
    authorization_level: 1,
  },
];

// Sign up
exports.signup = (req, res, next) => {
  res.status(200).json({ message: 'You are Signing up!' });
};

// Sign in
exports.signin = (req, res, nex) => {
  const { username, password } = req.body;

  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (!user) {
    return res.status(404).json({ message: 'User not Found!' });
  }
  res.status(200).json(user);
};

// get user by id
exports.getUserById = (req, res, next) => {
  const { id } = req.params;

  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ message: 'User not Found!' });
  }
  res.status(200).json(user);
};

// get user by username
exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;

  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not Found!' });
  }
  res.status(200).json(user);
};

// Fetch all users
exports.fetchAllUsers = (req, res, next) => {
  if (users.length <= 0) {
    return res.status(404).json({ message: 'User not Found!' });
  }
  res.status(200).json(users);
};

// Update an user
exports.updateUser = (req, res, next) => {
  const { id } = req.params;
  const { newData } = req.body;

  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ message: 'User not Found!' });
  }
  res.status(200).json({ ...user, ...newData });
};

// Delete an user
exports.deleteUser = (req, res, next) => {
  const { id } = req.params;

  const userIndex = users.findIndex((u) => u.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not Found!' });
  }
  users.splice(userIndex, 1);
  res.status(200).json(users);
};
