
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50)
    },
    description: {
      type: DataTypes.TEXT()
    }
  },{
    timestamps: false
  });

  return categories
}
