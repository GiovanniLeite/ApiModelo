import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class File extends Model {
  static init(sequelize) {
    super.init(
      {
        original_name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Nome original não deve ficar vazio.',
            },
          },
        },
        file_name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Nome do arquivo não deve ficar vazio.',
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${appConfig.url}/images/${this.getDataValue('file_name')}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'files',
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
