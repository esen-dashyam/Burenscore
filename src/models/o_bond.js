import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_bond", {
    customer_id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    o_bond_advamount: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    o_bond_starteddate: {
      type     : DataTypes.DATE,
      allowNull: false,
    }, o_bond_expdate: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    }, o_bond_currencycode: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    }, o_bond_type: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    }, o_bond_bondmarket: {
      type     : DataTypes.STRING(255),
      allowNull: false,
    }, o_bond_numberofbonds: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    }, o_bond_bondunitprice: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: false,
    }, o_bond_interestinperc: {
      type     : DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    o_bond_balance: {
      type     : DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    o_bond_isapproved: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};