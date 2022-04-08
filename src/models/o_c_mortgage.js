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
      type     : DataTypes.STRING(55),
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
      type     : DataTypes.BOOLEAN,
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
      type     : DataTypes.BOOLEAN,
      allowNull: true,
    },
    o_c_customer_registerno: {
      type     : DataTypes.STRING(16),
      allowNull: true,
    },
    o_c_organization_orgname: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_organization_localregistered: {
      type     : DataTypes.BOOLEAN,
      allowNull: true,
    },
    o_c_organization_orgregisterno: {
      type     : DataTypes.STRING(16),
      allowNull: true,
    },
    o_c_organization_stateregisterno: {
      type     : DataTypes.STRING(16),
      allowNull: true,
    },
    o_c_mrtregistereddate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_mrtstateregisterno: {
      type     : DataTypes.STRING(16),
      allowNull: true,
    },
    o_c_mrtcertificateno: {
      type     : DataTypes.STRING(16),
      allowNull: true,
    },
    o_c_mrtconfirmeddate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_mrtorgname: {
      type     : DataTypes.STRING(16),
      allowNull: true,
    },
    o_c_mrtregistereddatefim: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_mrtregisterno: {
      type     : DataTypes.STRING(16),
      allowNull: true,
    },
    o_c_mrtcertificatenofim: {
      type     : DataTypes.STRING(20),
      allowNull: true,
    },
    o_c_causetoshiftto: {
      type     : DataTypes.STRING(20),
      allowNull: true,
    },
    o_c_courtorderdate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_courtorderno: {
      type     : DataTypes.STRING(50),
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};