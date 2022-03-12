import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_c_relationcustomer", {
    customer_id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    o_c_relationcustomer_firstName: {
      type     : DataTypes.STRING(50),
      allowNull: false,
    },
    o_c_relationcustomer_lastName: {
      type     : DataTypes.STRING(50),
      allowNull: true,
    },
    o_c_relationcustomer_isforeign: {
      type     : DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_aco_c_relationcustomer_registernotive: {
      type     : DataTypes.STRING(16),
      allowNull: false,
    },
    o_c_relationcustomer_citizenrelation: {
      type     : DataTypes.STRING(255),
      allowNull: false,
    },
    o_c_relationcustomer_isfinancialonus: {
      type     : DataTypes.BOOLEAN,
      allowNull: false,
    },
    o_c_relationcustomer_relno: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};