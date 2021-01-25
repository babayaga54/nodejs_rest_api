const Sequelize = require('sequelize')
const sequelize = require('../database/database')


const conversation = sequelize.define('conversation',{
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            allowNull:false,
            primaryKey:true
        },
        users: {
            type: Sequelize.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('users')
            },
            set(val) {
               this.setDataValue('users',val.join(' '));
            },
        }
,        
        roleName : Sequelize.STRING,
        firstUser : Sequelize.STRING,
        lastMessage : Sequelize.STRING,
        notification : Sequelize.STRING,
        deleted : Sequelize.BOOLEAN
})
module.exports = conversation