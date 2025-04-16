require("dotenv").config()
const productModel = require("../models/products.model")
const { wrapAsync } = require("../utils/functions")
const AppError = require("../utils/AppError")


//Obtener todos los productos
exports.findAllProducts = wrapAsync(async(req, res) => {
    await companyModel.findAll({}, function(err, productsData){
        if(err){
            next(new AppError(err, 404))
        }else{
            res.status(200).json({empresas:productsData})
        }
    })
})


//Obtener un producto por su id
exports.findProductById = wrapAsync(async(req, res) => {//Función que muestra las compañias por id
    const {id} = req.params

    await productModel.findById(id, function(err, productData){
        if(err){//Si hay error
            next(new AppError(err, 400))
        }else{
            res.status(200).json(productData)
        }
    })
})


//Editar producto
exports.editProductById = wrapAsync(async(req, res) => {//Función que edita la compañia
    const { id } = req.params
    const { name, type, city, address, area, postalCode, phone, email, modifiedDate } = req.body
    const companyActualizado = {
        name: name,
        type: type,
        city: city,
        address: address,
        area: area,
        postalCode: postalCode,
        phone: phone,
        email: email,
        modifiedDate: new Date()
    }
    await companyModel.updateCompanyById(id, companyActualizado, function(err,datosActualizados){//Llama al método del modelo para actualizar la compañia por id
        if(err){//Si hay error
            next(new AppError(err, 400))//pasa un json con el error con el codigo 400
        }else{//Si no hay error
            console.log(datosActualizados)//Muestra los datos por consola
            res.status(200).json(datosActualizados)//pasa un json con los datos actualizados
        }
    })        
})