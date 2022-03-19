import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_t_report", {
    customer_id: {
      type        : DataTypes.STRING(55),
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    o_c_customercode: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_bank_code: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_registerno: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_t_circulatoryasset: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_te_cash: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_te_receivable: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_te_material: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_te_shortitmeinvest: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_te_otherasset: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_t_noncirculatoryasset: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_tu_building: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    is_ao_tu_equipmentctive: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_tu_furniture: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_tu_othertangible: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_tu_otherintangible: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_tu_accumdeppression: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_t_totalasset: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_t_shorttimeloan: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_tb_loanonaccount: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_tb_bankloan: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_tb_othershorttime: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_t_longtimeloan: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_t_ownerproperty: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_tz_companyfund: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_tz_other: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_tz_accumprofit: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_t_debtownerpropertyo_m_cashbalance: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};