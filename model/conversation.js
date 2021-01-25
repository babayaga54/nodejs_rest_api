const Sequelize = require('sequelize')
const sequelize = require('../database/database')


const conversation = sequelize.define('conversation',{
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            allowNull:false,
            primaryKey:true
        },
        users : Sequelize.JSON,
        roleName : Sequelize.STRING,
        firstUser : Sequelize.STRING,
        lastMessage : Sequelize.STRING,
        notification : Sequelize.STRING,
        updatedAt : Sequelize.DATE,
        deleted : Sequelize.BOOLEAN
})
module.exports = conversation