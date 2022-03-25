import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("neo_info", {
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
    relation_id: {
      type     : DataTypes.STRING(55),
      allowNull: true,
    },
    relation_type: {
      type     : DataTypes.STRING(55),
      allowNull: true,
    },
    orgmeasure: {
      type     : DataTypes.STRING(500),
      allowNull: true,
    },
    measuredate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    measuredescription: {
      type     : DataTypes.STRING(500),
      allowNull: true,
    },
    causetostartcase: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    datetstartcase: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    registertopolice: {
      type     : DataTypes.BOOLEAN,
      allowNull: true,
    },
    registertopolicedate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    timesinpolice: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    registertoprocuror: {
      type     : DataTypes.BOOLEAN,
      allowNull: true,
    },
    registertoprocurordate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    timesinprocuror: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    registertocourt: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    registertocourtdate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    timesincourt: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    shiftocourt2: {
      type     : DataTypes.BOOLEAN,
      allowNull: true,
    },
    shifttocourt2date: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    timesincourt2: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    shiftocourtdecision: {
      type     : DataTypes.BOOLEAN,
      allowNull: true,
    },
    shifttocourtdecisiondate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    ignoredcrime: {
      type     : DataTypes.BOOLEAN,
      allowNull: true,
    },
    ignoreddate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    courtorderno: {
      type     : DataTypes.STRING(500),
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};