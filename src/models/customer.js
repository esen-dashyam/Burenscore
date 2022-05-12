import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("customer", {
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
    o_c_loandescription: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_bank_code: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_branchcode: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_isorganization: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_customername: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    c_lastname: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_isforeign: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_birthdate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_zipcode: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_address: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_registerno: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_stateregister_passportorno: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_numofemployee: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    c_familynumofmembers: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    c_familynumofunemployed: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    c_job: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    c_occupation: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_fitchrating: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_sandp_rating: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_moodysrating: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_companytypecode: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_president_family_firstname: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_president_family_lastname: {
      type     : DataTypes.STRING(50),
      allowNull: true,
    },
    o_c_president_family_isforeign: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_president_family_registerno: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_noofshareholders: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },


    ...fields(DataTypes)
  });
};