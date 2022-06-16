import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../models/User';
import File from '../models/File';
import Example from '../models/Example';

const models = [User, File, Example];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models),
);
