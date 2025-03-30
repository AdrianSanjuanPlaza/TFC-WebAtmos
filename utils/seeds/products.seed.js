const productModel = require("../../models/products.model")
const mongodbConfig = require("../mongodb.config")

const exec = async() => {
    await mongodbConfig.conectarMongoDB()
    .then(() => {
        console.log("Conectado con MongoDB!!!")
    })
    .catch((err) => {
        console.log("Error al conectar. Desc: " + err)
        process.exit(0)
    })

    const product = [
        {
            name: "Web con plantilla",
            description: "Aplicación web realizada mediante una plantilla. Hay muchos diseños entre los que elegir, desde un diseño más sobrio y discreto hasta un diseño más moderno y llamativo.",
            price: 120
        },
        {
            name: "Web con plantilla + mantenimiento",
            description: "Aplicación web realizada mediante una plantilla. Hay muchos diseños entre los que elegir, desde un diseño más sobrio y discreto hasta un diseño más moderno y llamativo. A demás incluye el mantenimiento de la web por un año completo.",
            price: 150
        },
        {
            name: "Web con plantilla + despliegue local",
            description: "Aplicación web realizada mediante una plantilla. Hay muchos diseños entre los que elegir, desde un diseño más sobrio y discreto hasta un diseño más moderno y llamativo. A demás incluye el despliegue en tu servidor local.",
            price: 140
        },
        {
            name: "Web con plantilla - Atmos pack",
            description: "Aplicación web realizada mediante una plantilla. Hay muchos diseños entre los que elegir, desde un diseño más sobrio y discreto hasta un diseño más moderno y llamativo. A demás incluye el mantenimiento de la web por un año completo y el despliegue en tu servidor local.",
            price: 165  
        },
        {
            name: "Web a medida",
            description: "Aplicación web realizada a medida según tus necesidades y preferencias. Elige desde la distribución hasta el diseño al completo. El proceso es mucho más personal y único.",
            price: 180
        },
        {
            name: "Web a medida + despliegue local",
            description: "Aplicación web realizada a medida según tus necesidades y preferencias. Elige desde la distribución hasta el diseño al completo. El proceso es mucho más personal y único. A demás incluye el mantenimiento de la web por un año completo.",
            price: 200
        },
        {
            name: "Web a medida + mantenimiento",
            description: "Aplicación web realizada a medida según tus necesidades y preferencias. Elige desde la distribución hasta el diseño al completo. El proceso es mucho más personal y único. A demás incluye el despliegue en tu servidor local",
            price: 210
        },
        {
            name: "Web a medida - Atmos pack",
            description: "Aplicación web realizada a medida según tus necesidades y preferencias. Elige desde la distribución hasta el diseño al completo. El proceso es mucho más personal y único. A demás incluye el mantenimiento de la web por un año completo y el despliegue en tu servidor local.",
            price: 225
        },
        {
            name: "Matenimiento de tu web",
            description: "Actualizaciones tecnológicas y de contenido para tu aplicación web por un año completo.",
            price: 500
        },
        {
            name: "Despliegue local de tu web",
            description: "Despliegue o migración de tu aplicación web en tu servidor local",
            price: 350
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