const Users = require("../models/users");

class UsersRepository {
  async findAllUsers(offset, limit) {
    return Users.findAll({
      attributes: ["id", "email", "role"],
      offset: offset,
      limit: limit,
    });
  }

  async findUserById(id) {
    return Users.findOne({
      attributes: ["id", "email", "role"],
      where: {
        id,
      },
    });
  }

  async addUser(id, email, gender, password, role) {
    return Users.create({
      id: id,
      email: email,
      gender: gender,
      password: password,
      role: role,
    });
  }

  async updateUser(newId, newEmail, newGender, newPassword, newRole, UserID) {
    return Users.update(
      {
        id: newId,
        email: newEmail,
        gender: newGender,
        password: newPassword,
        role: newRole,
      },
      { where: { id: UserID } }
    );
  }

  async deleteUser(id) {
    return Users.destroy({ where: { id } });
  }
}

module.exports = UsersRepository;
