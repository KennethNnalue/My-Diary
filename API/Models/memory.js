const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Memory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { User } = models;
      Memory.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  Memory.init({
    title: DataTypes.STRING,
    story: DataTypes.STRING,
    mood: DataTypes.STRING,
    picture: DataTypes.STRING,
    userId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Memory',
  });
  return Memory;
};
