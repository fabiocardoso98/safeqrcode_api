
module.exports = (sequelize, DataTypes) => {
  const folders = sequelize.define('folders', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(50)
    },
    img: {
      type: DataTypes.STRING(50)
    },
    cor: {
      type: DataTypes.STRING(50)
    },
    partilhado: {
      type: DataTypes.BOOLEAN
    },
    dataAdicionado: {
      type: DataTypes.DATE
    },
    dataAtualizado: {
      type: DataTypes.DATE
    }
  },{
    timestamps: false
  });

  folders.associate = folder => {
    folders.belongsTo(folder.categories),
    folders.belongsTo(folder.users),
    folders.belongsToMany(folder.qrcodes, {
      through: 'foldersQrCodes',
      timestamps: false
    })
  }
  
  return folders
}
