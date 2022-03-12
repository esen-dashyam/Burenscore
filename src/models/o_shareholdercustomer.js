import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_shareholdercustomer", {
    customer_id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    o_shareholder_firstname: {
      type     : DataTypes.STRING(50),
      allowNull: true,
    },
    o_shareholder_lastname: {
      type     : DataTypes.STRING(50),
      allowNull: false,
    },
    o_shareholdercus_isforeign: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_shareholdercus_registerno: {
      type     : DataTypes.STRING(16),
      allowNull: false,
    },

    ...fields(DataTypes)
  });
};