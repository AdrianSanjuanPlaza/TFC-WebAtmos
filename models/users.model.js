const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    birthday:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:false
    },
    isActive:{
        type:Boolean,
        required:true
    },
    profile:{
        type: String,
        required:true
    },
    createdDate:{
        type: String,
        required:true
    },
    modifiedDate:{
        type:String,
        required:true
    }
})

const user = mongoose.model("user", userSchema)


//crear usuario
user.createUser = async(userData, result) => {
    const newUser = new user(userData)
    await newUser.save()
    .then((data) => {
        result(null, datos)
    })
    .catch((err) => {
        result(err, null)
    })
}

//listar todos los usuarios
user.findAll = async(filter={}, result) => {
    const datos = await user.find(filter)
    if(datos && datos.lenght > 0){
        result(null, datos)
    }else{
        result({"error":"No hay datos de usuarios"}, null)
    }
}

//listar un usuario por su id
user.findById = async(id, result) => {
    const datos = await user.findById(id)
    if(datos){
        result(null, datos)
    }else{
        result({"error":"No hay datos"}, null)
    }
}

user.updateUserById = async(id, userData, result) => {
    await user.findByIdAndUpdate(id, userData, {runValidators:true, new:true})
    .then((datosResult) => {
        result(null, datosResult)
    })
    .catch((err) => {
        result(err, null)
    })
}

user.deleteUserById = async(id, result) => {
    await user.findByIdAndDelete(id)
    .then((datos) => {
        result(null, datos)
    })
    .catch((err) => {
        result(err, null)
    })
}

module.exports = user