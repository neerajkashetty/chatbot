"use strict";
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) =>{


    class User extends Model {

        static associate(models) {

        }
    }
    User.init (
        {
            username:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password:{
                type: DataTypes.STRING,
                allowNull: false
            },
            email:{
                type: DataTypes.STRING,
                allowNull:false
            },
            firstName:{
                type: DataTypes.STRING
            },
            lastName:{
                type: DataTypes.STRING
            }

        },
        {
            sequelize,
            modelName: "User",
            tableName: "users"
        }
    )
    return User;
}





