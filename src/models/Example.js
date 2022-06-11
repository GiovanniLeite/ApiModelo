import Sequelize, { Model } from 'sequelize';

export default class Example extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 50],
              msg: 'Campo nome deve ter entre 3 e 50 caracteres',
            },
          },
        },
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
