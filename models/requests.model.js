const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    state:{
        type:Boolean,
        required:true
    },
    createdDate:{
        type: String,
        required: true
    },
    modifiedDate:{
        type: String,
        required: true
    }
})

const request = mongoose.model("request", requestSchema)

request.createRequest = async(requestData, result) => {// Método para crear solicitud
    const newRequest = new Inscription(inscriptionData)// Crea nueva instancia
    await newRequest.save()// Guarda en base de datos
    .then((datos) => {
        result(null, datos)// Retorna datos si hay éxito
    })
    .catch((err) => {
        result(err, null)// Retorna error si hay algún fallo
    })
}

request.findAllRequests = async(result)=>{// Método para buscar todas las solicitudes
    const datos = await request.find({})// Busca todas las solicitudes
    if(datos){ //Si hay datos
        result(null, datos) // Retorna todos los datos encontrados
    }else{ //Si no hay datos
        result({"error":"No hay datos"},null)// Retorna un  error si no encuentra
    }
}

request.findRequestById = async(id, result)=>{// Método para buscar por ID
    const datos = await request.findById(id)// Busca por la ID
    if(datos){ //Si hay datos
        result(null,datos)// Retorna los datos si los encuentra
    }else{ //Si no hay datos
        result({"error":"No hay datos"},null)// Retorna un  error si no encuentra
    }
}

request.updateRequestById = async(id, requestData, result) => { // Método actualizar por ID
    await request.findByIdAndUpdate(id, requestData, {runValidators:true, new:true}) // Actualiza documento
    .then((datosResultado) => {
        result(null, datosResultado)// Retorna los datos actualizados
    })
    .catch((err) => {
        result(err, null)// Retorna error si hay algún fallo
    })
}

request.deleteRequestById = async(id, result) => {// Método para eliminar por ID
    await request.findByIdAndDelete(id)
    .then((datos) => {
        result(null, datos)// Retorna los datos eliminados
    })
    .catch((err) => {
        result(err, null)// Retorna un error si hay algún fallo
    })
}

module.exports = request