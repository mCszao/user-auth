import { Sequelize, Config } from 'sequelize';
const config = require('../config/database.js');

export default new Sequelize(config);
