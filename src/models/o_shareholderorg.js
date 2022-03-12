import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_shareholderorg", {
    customer_id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    o_shareholder_orgname: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_shareholderorg_isforeign: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_shareholderorg_registerno: {
      type     : DataTypes.STRING(255),
      allowNull: false,
    },
    o_shareholder_stateregisterno: {
      type     : DataTypes.STRING(255),
      allowNull: false,
    },
    is_o_shareholder_sectorcodeactive: {
      type     : DataTypes.STRING(255),
      allowNull: false,
    },
    o_shareholder_sectorcodes: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },

    ...fields(DataTypes)
  });
};