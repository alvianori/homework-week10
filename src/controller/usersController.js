const UsersRepository = require("../repository/usersRepository");

const usersRepository = new UsersRepository();

const getAllUsers = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || undefined;
    const response = await usersRepository.findAllUsers(offset, limit);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const UserID = req.params.id;
    const response = await usersRepository.findUserById(UserID);
    if (!response) return res.status(404).json({ msg: `User Not Found!` });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createUser = async (req, res) => {
  const { id, email, gender, password, role } = req.body;
  try {
    const response = await usersRepository.addUser(id, email, gender, password, role);
    res.status(201).json({ msg: "Add User Successfully", user: response });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  const UserID = req.params.id;
  const User = await usersRepository.findUserById(UserID);

  if (!User) return res.status(404).json({ msg: `User Not Found!` });

  const { id, email, gender, password, role } = req.body;
  function getValueOrOriginal(value, original) {
    return value === "" || value === null ? original : value;
  }

  const newId = getValueOrOriginal(id, User.id);
  const newEmail = getValueOrOriginal(email, User.email);
  const newGender = getValueOrOriginal(gender, User.gender);
  const newPassword = getValueOrOriginal(password, User.password);
  const newRole = getValueOrOriginal(role, User.role);
  try {
    await usersRepository.updateUser(newId, newEmail, newGender, newPassword, newRole, UserID);
    res.status(200).json({ msg: `User With ID ${req.params.id} Updated` });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const deleteUser = async (req, res) => {
  const UserID = req.params.id;
  const User = await usersRepository.findUserById(UserID);
  if (!User) return res.status(404).json({ msg: `User Not Found!` });

  try {
    await usersRepository.deleteUser(UserID);
    res.status(200).json({ msg: `User With ID ${req.params.id} Deleted` });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
