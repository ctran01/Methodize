"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Team.hasMany(models.Project, {
        foreignKey: "team_id",
      });

      Team.belongsToMany(models.User, {
        foreignKey: "team_id",
        through: "UserTeams",
        otherKey: "user_id",
      });

      // Team.hasMany(models.UserTeam, {
      //   foreignKey: "team_id",
      // });
    }
  }
  Team.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Team",
    }
  );
  return Team;
};
