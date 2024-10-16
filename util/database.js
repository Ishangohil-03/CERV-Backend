const { Sequelize } = require('sequelize');
const config = require('../util/config');
const db = {};

const sequelize = new Sequelize("cerv", "jerry", "jerrypassword", {
    dialect: 'mysql',
    host: "43.204.219.99",
    port: 3306,
    operatorAliases: false,

    pool: {
        max: 5, 
        min: 0, 
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;