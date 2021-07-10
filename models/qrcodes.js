
module.exports = (sequelize, DataTypes) => {
  const qrcodes = sequelize.define('qrcodes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50)
    },
    content: {
      type: DataTypes.TEXT()
    },
    img: {
      type: DataTypes.STRING(50)
    },
    latlng: {
      type: DataTypes.STRING(50)
    },
    adress: {
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

  qrcodes.associate = qr => {
    qrcodes.belongsTo(qr.categories),
    qrcodes.belongsTo(qr.users),
    qrcodes.belongsToMany(qr.folders, {
      through: 'foldersQrCodes',
      timestamps: false
    }),
    qrcodes.belongsToMany(qr.MultiQrcodes, {
      through: 'MultiQrcodesToQrcodes',
      timestamps: false
    })
  }
  
  return qrcodes
}
