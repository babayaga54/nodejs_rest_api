
const Sequlize = require('sequelize')

const sequelize = new Sequlize('socket_fatih','root','root',{dialect  :'mysql',host : 'localhost' ,port :'3306'})

// const sequelize = new Sequelize('sql12364333','sql12364333','pZRlZjvdUL', { dialect:'mysql' , host:'sql12.freemysqlhosting.net'});

module.exports= sequelize;