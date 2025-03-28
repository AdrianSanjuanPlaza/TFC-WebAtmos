require("dotenv").config()//Importa y configura las variables de entorno
const mongoose = require("mongoose")//Conectamos con MongoDB

exports.conectarMongoDB = async() => {//Exportamos la conexión con MongoDB
    return mongoose.connect(process.env.MONGODB_CONSTRING)
}