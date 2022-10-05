const { DataTypes } = require('sequelize')
const sequelize = require('../../helpers/database/postgres')

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING(127)
  },
  username: {
    type: DataTypes.STRING(127)
  },
  email: {
    type: DataTypes.STRING(127),
    allowNull: true
  },
  password: {
    type: DataTypes.TEXT
  }
}, {
  paranoid: true,
  timestamps: true,
  freezeTableName: true
})

module.exports = User