import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("client", {
    id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      primaryKey  : true,
      defaultValue: DataTypes.UUIDV4
    },
    partner_id: {
      type      : DataTypes.UUID,
      allowNull : false,
      primaryKey: false,
    },
    client_id: {
      type      : DataTypes.STRING(45),
      allowNull : false,
      primaryKey: false,
    },
    client_secret: {
      type      : DataTypes.STRING(255),
      allowNull : false,
      primaryKey: false,
    },
    is_active: {
      type      : DataTypes.BOOLEAN,
      allowNull : false,
      primaryKey: false,
    },
    request_count: {
      type        : DataTypes.INTEGER,
      allowNull   : false,
      primaryKey  : false,
      defaultValue: 0
    },
    success_request: {
      type        : DataTypes.FLOAT,
      allowNull   : false,
      primaryKey  : false,
      defaultValue: 0
    },
    failed_request: {
      type        : DataTypes.FLOAT,
      allowNull   : false,
      primaryKey  : false,
      defaultValue: 0
    },
    expiry_hours: {
      type      : DataTypes.INTEGER,
      allowNull : false,
      primaryKey: false,
    },
    session_id: {
      type      : DataTypes.STRING(45),
      allowNull : false,
      primaryKey: false,
    },
    client_status: {
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