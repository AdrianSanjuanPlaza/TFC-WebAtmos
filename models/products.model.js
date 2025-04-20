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

const products = mongoose.model("products", productSchema)

//crear producto
products.createProduct = async(productData, result) => {
    const newProduct = new products(productData)
    await newProduct.save()
    .then((data) => {
        result(null, datos)
    })
    .catch((err) => {
        result(err, null)
    })
}

//listar todos los productos
products.findAll = async(filter={}, result) => {
    const datos = await products.find(filter)
    if(datos && datos.length > 0){
        result(null, datos)
    }else{
        result({"error":"No hay datos de productos"}, null)
    }
}

//listar un producto por su id
products.findProductById = async(id, result) => {
    const datos = await products.findById(id)
    if(datos){
        result(null, datos)
    }else{
        result({"error":"No hay datos"}, null)
    }
}

products.updateProductById = async(id, userData, result) => {
    await products.findByIdAndUpdate(id, productData, {runValidators:true, new:true})
    .then((datosResult) => {
        result(null, datosResult)
    })
    .catch((err) => {
        result(err, null)
    })
}

products.deleteProductById = async(id, result) => {
    await products.findByIdAndDelete(id)
    .then((datos) => {
        result(null, datos)
    })
    .catch((err) => {
        result(err, null)
    })
}

module.exports = products