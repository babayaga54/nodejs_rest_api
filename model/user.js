const  Sequelize = require('sequelize')

const sequlize = require('../database/database')


const User = sequlize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    email :{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
       
    },
    surname: {
        type:Sequelize.STRING,
        allowNull:false
       
    },
    telephone: {
        type:Sequelize.STRING,
        allowNull:false
       
    },
    photo: Sequelize.STRING,
    password:{
        type:Sequelize.STRING,
        allowNull:false
       
    },
    deleted: Sequelize.BOOLEAN
})

module.exports= User;