const Sequelize = require('sequelize')
const sequelize = require('../database/database')


const group = sequelize.define('group',{
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            allowNull:false,
            primaryKey:true
        },
        deleted : Sequelize.BOOLEAN
})
module.exports = group