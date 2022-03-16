import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("client", {
    id: {
      type        : DataTypes.STRING(55),
      allowNull   : false,
      primaryKey  : true,
      defaultValue: DataTypes.UUIDV4
    },
    client_id: {
      type      : DataTypes.UUID,
      allowNull : false,
      primaryKey: false,
    },
    request_date: {
      type      : DataTypes.DATE,
      allowNull : false,
      primaryKey: false,
    },
    request_status: {
      type        : DataTypes.INTEGER,
      allowNull   : false,
      primaryKey  : false,
      defaultValue: 0
    },
    request_save_count: {
      type        : DataTypes.FLOAT,
      allowNull   : false,
      primaryKey  : false,
      defaultValue: 0
    },
    request_fail_count: {
      type        : DataTypes.FLOAT,
      allowNull   : false,
      primaryKey  : false,
      defaultValue: 0
    },
    request_err: {
      type      : DataTypes.INTEGER,
      allowNull : false,
      primaryKey: false,
    },
    request_failed_data: {
      type      : DataTypes.STRING(45),
      allowNull : false,
      primaryKey: false,
    },
    client_status_date: {
      type      : DataTypes.DATE,
      allowNull : false,
      primaryKey: false,
    },
    note: {
      type      : DataTypes.TEXT,
      allowNull : true,
      primaryKey: false
    },
    ...fields(DataTypes)
  });
};