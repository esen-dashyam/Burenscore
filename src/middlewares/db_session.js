import { DB_SESSION } from "@goodtechsoft/sequelize-postgres";

export const fields = DataTypes => {
  return {
    created_by: {
      type     : DataTypes.STRING(100),
      allowNull: false
    },
    created_at: {
      type     : DataTypes.DATE,
      allowNull: false
    },
    updated_by: {
      type     : DataTypes.STRING(100),
      allowNull: false
    },
    updated_at: {
      type     : DataTypes.DATE,
      allowNull: false
    },
    status: {
      type        : DataTypes.BOOLEAN,
      allowNull   : false,
      defaultValue: true
    }
  };
};

export default DB_SESSION(user => ({
  create: {
    created_at: new Date(),
    created_by: user ? `${user.last_name} ${user.first_name}` : "System",
    updated_at: new Date(),
    updated_by: user ? `${user.last_Name} ${user.first_name}` : "System",
    status    : true
  },
  update: {
    updated_at: new Date(),
    updated_by: user ? `${user.last_name} ${user.first_name}` : "System",
  },
  find: {
    status: true
  },
  remove: {
    updated_at: new Date(),
    updated_by: user ? `${user.last_name} ${user.first_name}` : "System",
    status    : false
  }
}));