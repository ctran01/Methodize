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
        validate: {
          notEmpty: {
            args: true,
            msg: "Please provide a value for username.",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please provide your full name",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please provide a value for email.",
          },
          isEmail: {
            args: true,
            msg: "Email addresss is not a valid email.",
          },
        },
      },
      hashed_password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please provide a value for password.",
          },
          len: {
            args: [8, 255],
            msg: "Length needs to be between 8 - 255 characters.",
          },
        },
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
