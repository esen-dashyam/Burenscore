import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_m_report", {
    customer_id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    o_m_operatingmoneyflow: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_mu_profitbeforetaxinterest: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_mu_deppressionexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_mu_tax: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_mu_materialprocurement: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_m_financemoneyflow: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_ms_receivablechange: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_ms_shorttimeinvestchange: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_ms_loanonaccountchange: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_ms_bankloanchange: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_ms_longtermsource: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_ms_interestexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_ms_ownerproperty: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_ms_earningforshare: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_m_investmoneyflow: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_mh_building: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_mh_equipment: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_mh_furniture: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_mh_othertangible: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_mh_otherintangible: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_mh_accumdepression: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_m_totalmoneyflow: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_m_cashbalance: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },

    ...fields(DataTypes)
  });
};