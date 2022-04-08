import { define, Sequelize, db, } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

const { Op } = Sequelize;

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_c_loan_information", {
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
    o_c_provideloansize: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_c_loan_loanprovenance: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_loan_balance: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_c_loan_starteddate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_loan_expdate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_loan_currencycode: {
      type     : DataTypes.STRING(45),
      allowNull: true,
    },
    o_c_loan_sectorcode: {
      type     : DataTypes.STRING(45),
      allowNull: true,
    },
    o_c_loan_interestinperc: {
      type     : DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    o_c_loan_commissionperc: {
      type     : DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    o_c_loan_fee: {
      type     : DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    o_c_loan_extdate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_updatedexpdate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_loan_loanclasscode: {
      type     : DataTypes.STRING(45),
      allowNull: true,
    },
    o_c_loan_isapproved: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_loan_loanintype: {
      type     : DataTypes.STRING(45),
      allowNull: true,
    },
    o_c_loan_loancharttype: {
      type     : DataTypes.STRING(45),
      allowNull: true,
    },
    o_c_loan_interestcharttype: {
      type     : DataTypes.STRING(45),
      allowNull: true,
    },
    payment_status: {
      type        : DataTypes.STRING(45),
      allowNull   : true,
      defaultValue: "UNPAID"
    },
    ...fields(DataTypes)
  }, {
    hooks: {
      afterSave: async (value, { session }) => {
        const { id, o_c_loan_balance } = value.dataValues;
        console.log("=============>HOOK", id, o_c_loan_balance);
        if (o_c_loan_balance <= 0){
          await db.updateBy(db.OCLoanInformation, {
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