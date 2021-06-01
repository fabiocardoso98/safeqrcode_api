
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50)
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true
    },
    password: {
      type: DataTypes.TEXT()
    },
    createDate: {
      type: DataTypes.DATE
    },
    updateDate: {
      type: DataTypes.DATE
    },
    ativeCount: {
      type: DataTypes.BOOLEAN
    },
    token: {
      type: DataTypes.TEXT()
    }
  },{
    timestamps: false
  });

  // datasets.associate = models => {
  //   datasets.belongsTo(models.models);
  //   datasets.belongsTo(models.extension);
  //   datasets.belongsTo(models.LoadingMethod);
  //   datasets.belongsTo(models.source);
  // }
  
  return users
}
