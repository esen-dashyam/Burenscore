import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_c_mortgage", {
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
    o_c_mrtno: {
      type     : DataTypes.STRING(3),
      allowNull: true,
    },
    o_c_mrtno_internal: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_mrtcode: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_mrtdescription: {
      type     : DataTypes.STRING(150),
      allowNull: true,
    },
    o_c_is_real_estate: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_dateofvaluation: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_mrtvalue: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_c_mrtmaxlimit: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_c_customer_firstname: {
      type     : DataTypes.STRING(50),
      allowNull: true,
    },
    o_c_customer_lastname: {
      type     : DataTypes.STRING(50),
      allowNull: true,
    },
    o_c_customer_isforeign: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_customer_registerno: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_organization_orgname: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_organization_localregistered: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_organization_orgregisterno: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_organization_stateregisterno: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_mrtregistereddate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_mrtstateregisterno: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_mrtcertificateno: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_mrtconfirmeddate: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_mrtorgname: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_mrtregistereddatefim: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_mrtregisterno: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_mrtcertificatenofim: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};