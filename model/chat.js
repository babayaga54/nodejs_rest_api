const Sequelize = require('sequelize')
const sequelize = require('../database/database')


const chat = sequelize.define('chat',{
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            allowNull:false,
            primaryKey:true
        },
        
        senderId : Sequelize.INTEGER,
        conversationId : Sequelize.INTEGER,
        message : Sequelize.STRING,
        deleted : Sequelize.BOOLEAN
})
module.exports = chat