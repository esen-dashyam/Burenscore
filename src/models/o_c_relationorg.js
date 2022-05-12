import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_c_relationorg", {
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
    o_c_relationorg_orgname: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_relationorg_isforeign: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_relationorg_registerno: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_relationorg_stateregisterno: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_relationorg_orgrelation: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_relationorg_isfinancialonus: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_relationorg_relno: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};