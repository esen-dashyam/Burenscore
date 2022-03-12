import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_c_relationorg", {
    customer_id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    o_c_relationorg_orgname: {
      type     : DataTypes.STRING(255),
      allowNull: false,
    },
    o_c_relationorg_isforeign: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_relationorg_registerno: {
      type     : DataTypes.STRING(255),
      allowNull: false,
    },
    o_c_relationorg_stateregisterno: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_relationorg_sectorcodes: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_relationorg_sectorcode: {
      type     : DataTypes.STRING(255),
      allowNull: false,
    },
    o_c_relationorg_orgrelation: {
      type     : DataTypes.STRING(255),
      allowNull: false,
    },
    o_c_relationorg_isfinancialonus: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_relationorg_relno: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};