const Sequelize = require('sequelize')
const sequelize = require('../database/database')


const conversation = sequelize.define('conversation',{
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            allowNull:false,
            primaryKey:true
        },
        roleName : Sequelize.STRING,
        deleted : Sequelize.BOOLEAN
})
module.exports = conversation