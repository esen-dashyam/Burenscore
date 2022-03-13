import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("user", {
    id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      primaryKey  : true,
      defaultValue: DataTypes.UUIDV4
    },
    is_active: {
      type        : DataTypes.BOOLEAN,
      allowNull   : false,
      primaryKey  : false,
      defaultValue: true
    },
    password: {
      type      : DataTypes.STRING(500),
      allowNull : false,
      primaryKey: false
    },
    expiry_hours: {
      type        : DataTypes.INTEGER,
      allowNull   : false,
      primaryKey  : false,
      defaultValue: 24
    },
    user_suspended: {
      type        : DataTypes.BOOLEAN,
      allowNull   : false,
      primaryKey  : false,
      defaultValue: false
    },
    user_terminated: {
      type        : DataTypes.BOOLEAN,
      allowNull   : false,
      primaryKey  : false,
      defaultValue: false
    },
    password_expired: {
      type        : DataTypes.BOOLEAN,
      allowNull   : false,
      primaryKey  : false,
      defaultValue: false
    },
    expiry_date: {
      type      : DataTypes.DATE,
      allowNull : true,
      primaryKey: false
    },
    password_need_change: {
      type        : DataTypes.BOOLEAN,
      allowNull   : false,
      primaryKey  : false,
      defaultValue: false
    },
    note: {
      type      : DataTypes.TEXT,
      allowNull : true,
      primaryKey: false
    },
    ...fields(DataTypes)
  });
};