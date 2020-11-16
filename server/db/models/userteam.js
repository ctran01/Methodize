"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserTeam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // UserTeam.belongsTo(models.Team, {
      //   foreignKey: "team_id",
      // });
      // UserTeam.belongsTo(models.User, {
      //   foreignKey: "user_id",
      // });
    }
  }
  UserTeam.init(
    {
      user_id: {
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
      modelName: "UserTeam",
    }
  );
  return UserTeam;
};
