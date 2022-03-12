import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_c_mortgage", {
    customer_id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    o_c_mrtno: {
      type     : DataTypes.STRING(3),
      allowNull: false,
    },
    o_c_mrtno_internal: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_mrtcode: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_mrtdescription: {
      type     : DataTypes.STRING(150),
      allowNull: false,
    },
    o_c_is_real_estate: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_dateofvaluation: {
      type     : DataTypes.DATE,
      allowNull: false,
    },
    o_c_mrtvalue: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    o_c_mrtmaxlimit: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    o_c_customer_firstname: {
      type     : DataTypes.STRING(50),
      allowNull: false,
    },
    o_c_customer_lastname: {
      type     : DataTypes.STRING(50),
      allowNull: false,
    },
    o_c_customer_isforeign: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_customer_registerno: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_organization_orgname: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_organization_localregistered: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_organization_orgregisterno: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_organization_stateregisterno: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    is_ao_c_mrtregistereddatective: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_mrtstateregisterno: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_mrtcertificateno: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_mrtconfirmeddate: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_mrtorgname: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_mrtregistereddatefim: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_mrtregisterno: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_mrtcertificatenofim: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    ...fields(DataTypes)
  });
};