import { define, Sequelize, db, } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

const { Op } = Sequelize;

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_bond", {
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
    o_bond_advamount: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    o_bond_starteddate: {
      type     : DataTypes.DATE,
      allowNull: false,
    },
    o_bond_expdate: {
      type     : DataTypes.DATE,
      allowNull: false,
    },
    o_bond_currencycode: {
      type     : DataTypes.STRING(55),
      allowNull: false,
    },
    o_bond_type: {
      type     : DataTypes.STRING(55),
      allowNull: false,
    },
    o_bond_bondmarket: {
      type     : DataTypes.STRING(100),
      allowNull: false,
    },
    o_bond_numberofbonds: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    o_bond_bondunitprice: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    o_bond_interestinperc: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: false,
    },
    o_bond_balance: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: false,
    },
    o_bond_isapproved: {
      type     : DataTypes.BOOLEAN,
      allowNull: true,
    },
    payment_status: {
      type        : DataTypes.STRING(45),
      allowNull   : true,
      defaultValue: "UNPAID"
    },
    ...fields(DataTypes)
  },
  {
    hooks: {
      afterSave: async (value, { session }) => {
        const { id, o_bond_balance } = value.dataValues;
        console.log("=============>HOOK", id, o_bond_balance);
        if (o_bond_balance <= 0){
          await db.updateBy(db.OBond, {
            payment_status: "PAID",
          }, {
            id: {
              [Op.eq]: id
            }
          }, session);
        }
      }
    }
  });
};