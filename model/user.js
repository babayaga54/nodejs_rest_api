const  Sequelize = require('sequelize')

const sequlize = require('../database/database')


const User = sequlize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    email : Sequelize.STRING,
    name:Sequelize.STRING,
    surname: Sequelize.STRING,
    telephone: Sequelize.STRING,
    photo: Sequelize.STRING,
    type: Sequelize.STRING,
    password: Sequelize.STRING,
    deleted: Sequelize.BOOLEAN
})

module.exports= User;