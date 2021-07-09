
module.exports = (sequelize, DataTypes) => {
  const MultiQrcodes = sequelize.define('MultiQrcodes', {
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
    },
    content: {
      type: DataTypes.TEXT()
    },
    createDate: {
      type: DataTypes.DATE
    },
    updateDate: {
      type: DataTypes.DATE
    }
  },{
    timestamps: false
  });

  MultiQrcodes.associate = qr => {
    MultiQrcodes.belongsTo(qr.categories),
    MultiQrcodes.belongsTo(qr.users),
    MultiQrcodes.belongsToMany(qr.qrcodes, {
      through: 'MultiQrcodesToQrcodes',
      timestamps: false
    })
  }
  
  return MultiQrcodes
}
