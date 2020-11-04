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

      Project.belongsTo(models.User, {
        foreignKey: "owner_id",
      });
      Project.belongsTo(models.Team, {
        foreignKey: "team_id",
      });
    }
  }
  Project.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      owner_id: {
        type: DataTypes.INTEGER,
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
