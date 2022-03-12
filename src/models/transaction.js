import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("transaction", {
    customer_id: {
      type        : DataTypes.UUID,
      allowNull   : true,
      defaultValue: DataTypes.UUIDV4
    },
    relation_id: {
      type        : DataTypes.UUID,
      allowNull   : true,
      defaultValue: DataTypes.UUIDV4
    },
    type: {
      type     : DataTypes.STRING(55),
      allowNull: true,
    },
    relation_type: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    datetopay: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    amounttopay: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },

    ...fields(DataTypes)
  });
};