const Sequelize = require('sequelize')
const sequelize = require('../database/database')


const comment = sequelize.define('comment',{
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            allowNull:false,
            primaryKey:true
        },
        comment : Sequelize.STRING,
        deleted : Sequelize.BOOLEAN
})
module.exports = comment