"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.hasMany(models.TaskList, {
        foreignKey: "project_id",
      });

      Project.hasMany(models.Task, {
        foreignKey: "project_id",
      });

      Project.belongsTo(models.Team, {
        foreignKey: "team_id",
      });

      Project.belongsToMany(models.User, {
        foreignKey: "project_id",
        through: "UserProjects",
        otherKey: "user_id",
      });
    }
  }
  Project.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
