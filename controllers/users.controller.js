require("dotenv").config()
const bcrypt = require("../utils/bcrypt")
const userModel = require("../models/users.model")
const { wrapAsync } = require("../utils/functions")
const AppError = require("../utils/AppError")
const jwtMW = require("../middlewares/jwt.mw")
const fecha = require("../utils/fecha")

//función de validación de contraseña
function validarContrasena(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return regex.test(password);
}

//Listar todos los usuarios
exports.findAllUsers = wrapAsync(async function(req,res, next) {//Función para mostrar todos los usuarios

    await userModel.findAll({}, function(err,datosUsers){//Llama al método del modelo para encontrar todos los usuarios
        if(err){//Si hay error
            next(new AppError(err, 400))
        }else{//Si no hay error
            res.status(200).json(datosUsers)
        }
    })    
})

//Listar un usuario por su id
exports.findUserById = wrapAsync(async function(req,res, next){//Función para mostrar los usuarios por id
    const {id} = req.params
    await userModel.findUserById(id,function(err,datosUsuario){//Llama al método del modelo para encontrar los usuarios por id
        if(err){//Si hay error
            next(new AppError(err, 400))
        }else{//Si no hay error
            res.status(200).json(datosUsuario)
        }
    })
})

//Crear usuario
exports.createUser = wrapAsync(async function(req,res, next){//Función para crear el nuevo usuario
    // Crear nuevo objeto usuario con los datos del formulario
    const userData = req.body
    if(validarContrasena(userData.password)){
        userData.password = await bcrypt.hashPassword(userData.password)
        const newUser = new userModel({
            name: userData.name,
            surname: userData.surname,
            birthday: userData.birthday,
            phone: userData.phone,
            email: userData.email,
            password: userData.password,
            img: userData.img || null,
            isActive: true,
            profile: userData.profile || 'USER',
            createdDate: fecha.getFecha(),
            modifiedDate: fecha.getFecha()
        })
    
        await userModel.createUser(newUser, function(err, datosUsuarioCreado){//Llama al método del modelo para crear los usuarios
            if(err){//Si hay error
                console.error("Error al crear usuario:", err);//Muestra el error en consola
                next(new AppError(err, 400))
            } else {//Si no hay error
                res.status(200).json(datosUsuarioCreado)
            }
        })
    }else{
        next(new AppError("La contraseña no es válida, tiene que tener al menos 8 caracteres, 1 numero, 1 mayuscula, 1 minuscula y 1 caracter especial", 404))
    }
})

//Actualizar usuario
exports.updateUser = wrapAsync(async function(req,res, next){//Función para actualizar el usuario
    const {id} = req.params
    const userData = req.body
    const updateUser = {
        name: userData.name,
        surname: userData.surname,
        phone: userData.phone,
        email: userData.email,
        img: userData.img || null,
        modifiedDate: fecha.getFecha()
    }
    
    await userModel.updateUserById(id,updateUser,function(err,datosUsuarioActualizado){//Llama al método del modelo para actualizar el usuario
        if(err){//Si hay error
            next(new AppError(err, 400))
        }else{//Si no hay error
            res.status(200).json(datosUsuarioActualizado)
        }
    })
})

//Eliminar usuario
exports.deleteUserById = wrapAsync(async function(req,res, next){//Función para eliminar al usuario
    const {id} = req.params
    await userModel.deleteUserById(id,function(err,datosUsuario){
        if(err){//Si hay error
            next(new AppError(err, 400))
        }else{//Si no hay error
            res.status(200).json(datosUsuario)
        }
    })
})

//Logout
exports.logoutCSR = (req,res,next)=>{
    const jwtDestroyed = jwtMW.destroyJWT(req);
  
    if (jwtDestroyed) {
      req.session.destroy((err) => {
        if (err) {
          return next(new AppError('Error al destruir la sesión', 500));
        }
        res.status(200).json({ msg: 'Token eliminado y sesión destruida' });
      })

    } else {
      next(new AppError('Error al eliminar token o sesión inexistente', 500));
    }
}

//login
exports.login = wrapAsync(async (req, res, next) => {
    try {
        const { name, password } = req.body;

        // Verifica que los datos sean proporcionados
        if (!name || !password) {
            return next(new AppError("Usuario y contraseña son requeridos", 400)); // Agrega return para detener la ejecución
        }

        await userModel.findByUsername(name, async function (err, userFound) {
            if (err) {
                return next(new AppError(err, 400)); // Detenemos la ejecución en caso de error
            }

            if (!userFound) {
                return next(new AppError("Usuario y/o contraseña incorrectos", 401)); // Detenemos si no se encuentra el usuario
            }

            console.log(userFound)

            if (!userFound.password) {
                return next(new AppError("Error en los datos del usuario", 500)); // Si no hay contraseña
            }

            try {
                // Compara las contraseñas
                const validado = await bcrypt.compareLogin(password, userFound.password);

                if (validado) {
                    const jwtToken = jwtMW.createJWT(req, res, next, userFound);

                    const userLogued = {
                        data: userFound,
                        token: jwtToken
                    };

                    req.session.userLogued = userLogued;

                    console.log("Inserción la sessión");
                    console.log(req.session.userLogued);
                    console.log("----------------------");

                    res.status(200).json(userLogued);
                } else {
                    return next(new AppError("Usuario y/o contraseña incorrectos", 401)); // Detenemos si la contraseña no es válida
                }
            } catch (error) {
                return next(new AppError("Error en la validación de la contraseña", 500)); // Si ocurre un error al comparar las contraseñas
            }
        });
    } catch (error) {
        return next(new AppError(error.message || "Error en la autenticación", 500)); // Si ocurre cualquier error en el bloque try
    }
});
