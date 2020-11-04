"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Project, {
        foreignKey: "owner_id",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.TaskList, {
        foreignKey: "owner_id",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.Task, {
        foreignKey: "assignee_id",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.Comment, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.belongsToMany(models.Team, {
        foreignKey: "user_id",
        through: "UserTeams",
        otherKey: "team_id",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hashed_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashed_password.toString());
  };
  return User;
};
