import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_c_relationcustomer", {
    id: {
      type        : DataTypes.STRING(45),
      allowNull   : false,
      primaryKey  : true,
      defaultValue: DataTypes.UUIDV4
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
    o_c_relationcustomer_firstName: {
      type     : DataTypes.STRING(50),
      allowNull: true,
    },
    o_c_relationcustomer_lastName: {
      type     : DataTypes.STRING(50),
      allowNull: true,
    },
    o_c_relationcustomer_isforeign: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_relationcustomer_registerno: {
      type     : DataTypes.STRING(16),
      allowNull: true,
    },
    o_c_relationcustomer_citizenrelation: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_relationcustomer_isfinancialonus: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_relationcustomer_relno: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};