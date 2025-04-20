require("dotenv").config()
const requestModel = require("../models/requests.model")
const { wrapAsync } = require("../utils/functions")
const AppError = require("../utils/AppError")
const fecha = require("../utils/fecha")

//Crear
exports.createRequestCSR = wrapAsync(async (req, res, next) => {
    await requestModel.createRequest(req.body, function (err, requestCreated) {
        if (err) {
            next(new AppError(err, 400));
        } else {
            res.status(200).json(requestCreated);
        }
    });
});

//Find all
exports.findAllRequestCSR = wrapAsync(async (req, res, next) => {
    await requestModel.findAllRequests(function (err, datosRequest) {
        if (err) {
            next(new AppError(err, 500))
        } else {
            res.status(200).json(datosRequest)
        }
    });
});

//Find by id
exports.findRequestById = wrapAsync(async function(req,res, next){//Función para mostrar una solicitud por id
    const {id} = req.params
    await requestModel.findRequestById(id,function(err,datosRequest){//Llama al método del modelo para encontrar la solicitud por id
        if(err){//Si hay error
            next(new AppError(err, 400))
        }else{//Si no hay error
            res.status(200).json(datosRequest)
        }
    })
})

//Edit by id
exports.editRequestUser = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const { productId, descripcion } = req.body;
    const requestActualizado = {
        userId,
        productId: productId,
        descripcion: descripcion,
        state,
        createdDate,
        modifiedDate: fecha.getFecha()
    };
    await requestModel.updateRequestById(id, requestActualizado, function (err, datosActualizados) {
        if (err) {
            next(new AppError(err, 400));
        } else {
            res.status(200).json(datosActualizados);
        }
    });
});


//delete by id
exports.deleteRequest = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await requestModel.deleteRequestById(id, function (err, datosEliminados) {
        if (err) {
            next(new AppError(err, 400))
        } else {
            res.status(200).json(datosEliminados)
        }
    })
})

//Cambiar estado
exports.changeRequestState = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const { state } = req.body;
    const requestActualizado = {
        userId,
        productId,
        descripcion,
        state: state,
        createdDate,
        modifiedDate: fecha.getFecha()
    }
    await requestModel.updateRequestById(id, requestActualizado, function (err, datosActualizados) {
        if (err) {
            next(new AppError(err, 400));
        } else {
            res.status(200).json(datosActualizados);
        }
    });
})