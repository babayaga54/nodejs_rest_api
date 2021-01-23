const Sequelize = require('sequelize')
const sequelize = require('../database/database')


const like = sequelize.define('like',{
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            allowNull:false,
            primaryKey:true
        },
        deleted : Sequelize.BOOLEAN
})
module.exports = like