const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

const Aliment = sequelize.define(
    "Aliment",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nume:{
            type: DataTypes.STRING
        },

        categorie:{
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['LACTAT', 'FRUCT', 'LEGUMA', 'CARNE']
        },

        dataExpirare:{
            type:DataTypes.DATE,
            allowNull:false
        }


    },
    {
        tableName:"Alimente"
    }
)

module.exports=Aliment;