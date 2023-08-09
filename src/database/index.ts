import { Sequelize, Options } from 'sequelize';
const config: Options = require('../config/database.js');

export default new Sequelize(config);
