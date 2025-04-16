const productModel = require("../../models/products.model")
const mongodbConfig = require("../mongodb.config")
const fecha = require("../fecha")

const exec = async() => {
    await mongodbConfig.conectarMongoDB()
    .then(() => {
        console.log("Conectado con MongoDB!!!")
    })
    .catch((err) => {
        console.log("Error al conectar. Desc: " + err)
        process.exit(0)
    })

    
    function getFecha(){
        let fecha = new Date()
        let stringFecha = `${fecha.getDate().toString()}-${(fecha.getMonth()+1).toString()}-${fecha.getFullYear().toString()}`
        return stringFecha;
    }

    const product = [
        {
            name: "Web con plantilla",
            description: "Aplicación web realizada mediante una plantilla. Hay muchos diseños entre los que elegir, desde un diseño más sobrio y discreto hasta un diseño más moderno y llamativo.",
            price: 120,
            createdDate: fecha.getFecha(),
            modifiedDate: fecha.getFecha()
        },
        {
            name: "Web con plantilla + mantenimiento",
            description: "Aplicación web realizada mediante una plantilla. Hay muchos diseños entre los que elegir, desde un diseño más sobrio y discreto hasta un diseño más moderno y llamativo. A demás incluye el mantenimiento de la web por un año completo.",
            price: 150,
            createdDate: fecha.getFecha(),
            modifiedDate: fecha.getFecha()
        },
        {
            name: "Web con plantilla + despliegue local",
            description: "Aplicación web realizada mediante una plantilla. Hay muchos diseños entre los que elegir, desde un diseño más sobrio y discreto hasta un diseño más moderno y llamativo. A demás incluye el despliegue en tu servidor local.",
            price: 140,
            createdDate: fecha.getFecha(),
            modifiedDate: fecha.getFecha()
        },
        {
            name: "Web con plantilla - Atmos pack",
            description: "Aplicación web realizada mediante una plantilla. Hay muchos diseños entre los que elegir, desde un diseño más sobrio y discreto hasta un diseño más moderno y llamativo. A demás incluye el mantenimiento de la web por un año completo y el despliegue en tu servidor local.",
            price: 165,
            createdDate: fecha.getFecha(),
            modifiedDate: fecha.getFecha()
        },
        {
            name: "Web a medida",
            description: "Aplicación web realizada a medida según tus necesidades y preferencias. Elige desde la distribución hasta el diseño al completo. El proceso es mucho más personal y único.",
            price: 180,
            createdDate: fecha.getFecha(),
            modifiedDate: fecha.getFecha()
        },
        {
            name: "Web a medida + despliegue local",
            description: "Aplicación web realizada a medida según tus necesidades y preferencias. Elige desde la distribución hasta el diseño al completo. El proceso es mucho más personal y único. A demás incluye el mantenimiento de la web por un año completo.",
            price: 200,
            createdDate: fecha.getFecha(),
            modifiedDate: fecha.getFecha()
        },
        {
            name: "Web a medida + mantenimiento",
            description: "Aplicación web realizada a medida según tus necesidades y preferencias. Elige desde la distribución hasta el diseño al completo. El proceso es mucho más personal y único. A demás incluye el despliegue en tu servidor local",
            price: 210,
            createdDate: fecha.getFecha(),
            modifiedDate: fecha.getFecha()
        },
        {
            name: "Web a medida - Atmos pack",
            description: "Aplicación web realizada a medida según tus necesidades y preferencias. Elige desde la distribución hasta el diseño al completo. El proceso es mucho más personal y único. A demás incluye el mantenimiento de la web por un año completo y el despliegue en tu servidor local.",
            price: 225,
            createdDate: fecha.getFecha(),
            modifiedDate: fecha.getFecha()
        },
        {
            name: "Matenimiento de tu web",
            description: "Actualizaciones tecnológicas y de contenido para tu aplicación web por un año completo.",
            price: 500,
            createdDate: fecha.getFecha(),
            modifiedDate: fecha.getFecha()
        },
        {
            name: "Despliegue local de tu web",
            description: "Despliegue o migración de tu aplicación web en tu servidor local",
            price: 350,
            createdDate: fecha.getFecha(),
            modifiedDate: fecha.getFecha()
        },
    ]

    await productModel.insertMany(product)
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })

    process.exit()
}

exec()