import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("customer", {
    o_c_customercode: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_loandescription: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_bankCode: {
      type     : DataTypes.STRING(255),
      allowNull: false,
    },
    o_c_branchcode: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    is_aco_c_isorganizationtive: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_customername: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    c_lastname: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_isforeign: {
      type     : DataTypes.BOOLEAN,
      allowNull: false,
    },
    o_c_birthdate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_zipcode: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_address: {
      type     : DataTypes.STRING(255),
      allowNull: false,
    },
    o_c_registerno: {
      type     : DataTypes.STRING(255),
      allowNull: false,
    },
    o_c_stateregister_passportorno: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_sectorcodes: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_sectorcode: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_numofemployee: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    c_familynumofmembers: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    c_familynumofunemployed: {
      type     : DataTypes.INTEGER,
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
      allowNull: false,
    },
    o_c_president_family_firstname: {
      type     : DataTypes.STRING(50),
      allowNull: true,
    },
    o_c_president_family_lastname: {
      type     : DataTypes.STRING(50),
      allowNull: true,
    },
    o_c_president_family_isforeign: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_president_family_registerno: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_noofshareholders: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },

    ...fields(DataTypes)
  });
};