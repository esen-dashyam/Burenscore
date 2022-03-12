import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_c_onus_information", {
    customer_id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    o_c_onus_advamount: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    is_aco_c_onusmrtnostive: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_onusrelnos: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_onus_balance: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_c_onus_rightopeneddate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_onus_starteddate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_onus_paymentfinaldate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_onus_expdate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_onus_currencycode: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    is_o_c_onus_interestinpercactive: {
      type     : DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    o_c_onus_commissionperc: {
      type     : DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    o_c_onus_fee: {
      type     : DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    o_c_onus_loanclasscode: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_onus_isapproved: {
      type     : DataTypes.BOOLEAN,
      allowNull: true,
    },

    ...fields(DataTypes)
  });
};