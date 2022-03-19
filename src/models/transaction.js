import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("transaction", {
    customer_id: {
      type        : DataTypes.STRING(55),
      allowNull   : true,
      defaultValue: DataTypes.UUIDV4
    },
    relation_id: {
      type        : DataTypes.STRING(55),
      allowNull   : true,
      defaultValue: DataTypes.UUIDV4
    },
    o_c_customercode: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_bank_code: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_registerno: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    type: {
      type     : DataTypes.STRING(55),
      allowNull: true,
    },
    relation_type: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    datetopay: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    amounttopay: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },

    ...fields(DataTypes)
  });
};