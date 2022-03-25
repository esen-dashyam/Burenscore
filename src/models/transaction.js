import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("transaction", {
    id: {
      type        : DataTypes.STRING(45),
      allowNull   : false,
      primaryKey  : true,
      defaultValue: DataTypes.UUIDV4
    },
    relation_id: {
      type     : DataTypes.STRING(55),
      allowNull: false,
    },
    o_c_customercode: {
      type     : DataTypes.STRING(55),
      allowNull: false,
    },
    o_c_bank_code: {
      type     : DataTypes.STRING(255),
      allowNull: false,
    },
    o_c_registerno: {
      type     : DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type     : DataTypes.STRING(55),
      allowNull: false,
    },
    relation_type: {
      type     : DataTypes.STRING(55),
      allowNull: false,
    },
    datetopay: {
      type     : DataTypes.DATE,
      allowNull: false,
    },
    amounttopay: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: false,
    },

    ...fields(DataTypes)
  });
};