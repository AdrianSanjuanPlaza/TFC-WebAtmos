//dependencias
require("dotenv").config()
const methodOverride = require("method-override")
const express = require("express")
const fs = require("fs")
const session = require("express-session")
const app = express()
const path = require("path")
const port = process.env.PORT || process.env.PUERTO
const cors = require("cors")

//middlewares
const morganMW = require("./middlewares/morgan.mw")
const errorHandlerMW = require("./middlewares/errorHandler.mw")

//rutas específicas
const mongodbConfig = require("./utils/mongodb.config")
const AppError = require("./utils/AppError")
const logger = require("./utils/logger")
const usersRoutes = require("./routes/users.routes")
const productsRoutes = require("./routes/products.routes")
const requestsRoutes = require("./routes/requests.routes")

// ********** CONFIGURACIONES DEL SERVIDOR **********

app.use(methodOverride("_method")) // Configuramos methodOverride para permitir métodos HTTP como PUT y DELETE en formularios HTML
app.set("views",path.join(__dirname,"views")) // Definimos la carpeta de vistas
app.set("view engine","ejs")  // Usamos EJS como motor de plantillas
app.use(express.static(path.join(__dirname,"public"))) // Configuramos Express para servir archivos estáticos (como imágenes, JS) desde la carpeta "public"
app.use(express.urlencoded({extended:true})) // Lo usamos para datos de formularios (POST)
app.use(express.json()) // Lo usamos para datos en formato JSON (POST)

app.use((req,res,next) => { // Middleware para definir variables globales accesibles en las vistas de EJS
    //Variables Globales
    res.locals.BaseURL = `/api/${process.env.API}/`
    next()
})

/* CORS */
const whiteList = ["http://localhost:5173", "http://127.0.0.1:5173"]

const corsOptions = {
    origin:(origin, callback) => {
        console.log(origin)
        if(whiteList.includes(origin) || !origin){
            callback(null, true)
        }else{
            callback(new AppError("No estás autorizado", 403), false)
        }
    },
    credentials: true
}

app.use(cors(corsOptions))

app.use(morganMW.usingMorgan())

/* COOKIES DE INICIO DE SESION */
app.use(session({
    secret:process.env.SESSION_SECRET,//Firmar el SID, para generar el código y que no sea manipulado
    resave:false,//No se guardará en el store si no ha cambiado
    saveUninitialized:false,//No se guardará en el store hasta que no se inicialice de alguna forma
    cookie:{
        secure:false,//la sesión se enviará sólo en HTTPS (si está a true)
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
        sameSite:"none" //Permite envío de cookies en solicitudes entre diferentes dominios (CORS habilitado), pero requiere secure:true
    }    
}))

// ********** RUTAS DEL SERVIDOR **********
app.use(`/api/${process.env.API}/users`,usersRoutes)
app.use(`/api/${process.env.API}/products`,productsRoutes)
app.use(`/api/${process.env.API}/requests`,requestsRoutes)


//Middleware propio para las rutas no existentes
app.use((req,res)=>{
    logger.error.fatal("Ruta no existente " + req.originalUrl)
    throw new AppError("Ruta no existente", 404) //NOT FOUND
})

//Gestión de todos los errores (Síncronos y Asíncronos del API)
app.use(errorHandlerMW.errorHandler)

//levantar servidor
app.listen(port, async()=>{

    console.log(`${process.env.MENSAJE} http://localhost:${port}/api/${process.env.api}`) // ------------ modificar
    logger.access.info(`${process.env.MENSAJE} http://localhost:${port}/api/${process.env.API}`) // ------------ modificar
    try {
        //Una vez levantado el servidor, intentamos conectar con MongoDB
        await mongodbConfig.conectarMongoDB()
        .then(()=>{
            console.log("Conectado con MongoDB!!!")
        })
        .catch((err)=>{
            //Si no conectamos con MongoDB, debemos tumbar el server
            console.log(`Error al conectar. Desc: ${err}`)
            process.exit(0)
        })
    } catch (error) {
        //Si no conectamos con MongoDB, debemos tumbar el server
        console.log(`Error en el server. Desc: ${error}`)
        process.exit(0)
    }
})