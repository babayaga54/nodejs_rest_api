const Sequelize = require('sequelize')
const sequelize = require('../database/database')


const chat = sequelize.define('chat',{
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            allowNull:false,
            primaryKey:true
        },
        conversationId : Sequelize.INTEGER,
        senderId : Sequelize.INTEGER,
        message : Sequelize.STRING,
        deleted : Sequelize.BOOLEAN
})
module.exports = chat