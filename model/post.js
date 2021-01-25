const Sequelize = require('sequelize')
const sequelize = require('../database/database')


const post = sequelize.define('post',{
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            allowNull:false,
            primaryKey:true
        },
        post : Sequelize.STRING,
        deleted : Sequelize.BOOLEAN
})
module.exports = post