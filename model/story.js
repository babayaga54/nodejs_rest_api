const Sequelize = require('sequelize')
const sequelize = require('../database/database')


const story = sequelize.define('story',{
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            allowNull:false,
            primaryKey:true
        },
        deleted : Sequelize.BOOLEAN
})
module.exports =story