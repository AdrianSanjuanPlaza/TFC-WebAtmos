const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:true
    },
    createdDate:{
        type:String,
        required:true
    },
    modifiedDate:{
        type:String,
        required:true
    }
})

const product = mongoose.model("product", productSchema)

//crear producto
product.createUser = async(productData, result) => {
    const newProduct = new product(productData)
    await newProduct.save()
    .then((data) => {
        result(null, datos)
    })
    .catch((err) => {
        result(err, null)
    })
}

//listar todos los productos
product.findAll = async(filter={}, result) => {
    const datos = await product.find(filter)
    if(datos && datos.lenght > 0){
        result(null, datos)
    }else{
        result({"error":"No hay datos de productos"}, null)
    }
}

//listar un producto por su id
product.findById = async(id, result) => {
    const datos = await product.findById(id)
    if(datos){
        result(null, datos)
    }else{
        result({"error":"No hay datos"}, null)
    }
}

product.updateProductById = async(id, userData, result) => {
    await product.findByIdAndUpdate(id, productData, {runValidators:true, new:true})
    .then((datosResult) => {
        result(null, datosResult)
    })
    .catch((err) => {
        result(err, null)
    })
}

product.deleteProductById = async(id, result) => {
    await product.findByIdAndDelete(id)
    .then((datos) => {
        result(null, datos)
    })
    .catch((err) => {
        result(err, null)
    })
}

module.exports = product