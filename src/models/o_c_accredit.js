import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_c_accredit", {
    customer_id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    o_c_accredit_advamount: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    o_c_accredit_starteddate: {
      type     : DataTypes.DATE,
      allowNull: false,
    },
    o_c_accredit_expdate: {
      type     : DataTypes.DATE,
      allowNull: false,
    },
    o_c_accredit_currencycode: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_accredit_type: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_accredit_sectorcode: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_accredit_interestinperc: {
      type     : DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    o_c_accredit_commissionperc: {
      type     : DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    o_c_accredit_fee: {
      type     : DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    o_c_accredit_updatedexpdate: {
      type     : DataTypes.DATE,
      allowNull: false,
    },
    o_c_accredit_extcount: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_accredit_balance: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    o_c_accredit_isapproved: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },

    ...fields(DataTypes)
  });
};