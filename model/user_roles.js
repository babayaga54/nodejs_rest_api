const Sequelize = require('sequelize')
const sequelize = require('../database/database')


const user_role = sequelize.define('role',{
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            allowNull:false,
            primaryKey:true
        },
        roleName : Sequelize.STRING,
        deleted : Sequelize.BOOLEAN
})
module.exports = user_role