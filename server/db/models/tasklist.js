"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TaskList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TaskList.belongsTo(models.Project, {
        foreignKey: "project_id",
      });

      TaskList.belongsTo(models.User, {
        foreignKey: "owner_id",
      });

      TaskList.hasMany(models.Task, {
        foreignKey: "tasklist_id",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  TaskList.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      column_index: {
        type: DataTypes.INTEGER,
      },
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TaskList",
    }
  );
  return TaskList;
};
