const userModel = require("../../models/users.model")
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

    const user = [
        {
            name: "Adrián",
            surname: "Sanjuán Plaza",
            birthday: "11-11-2005",
            phone: 666666666,
            email: "sanjuanplazaadrian@gmail.com",
            password: "$2a$12$RVcQSOJkNfLDwlXk79tguu5A22cs4NabdKCnG85HNk2HrSAuFbqxK",
            isActive: true,
            profile: "ADMIN",
            createdDate: fecha.getFecha(),
            modifiedDate: fecha.getFecha()
        },
        {
            name: "Fernando",
            surname: "Alonso Díaz",
            birthday: "29-7-1981",
            phone: 333333333,
            email: "fernandoyla33@gmail.com",
            password: "$2a$12$RVcQSOJkNfLDwlXk79tguu5A22cs4NabdKCnG85HNk2HrSAuFbqxK",
            isActive: true,
            profile: "USER",
            createdDate: fecha.getFecha(),
            modifiedDate: fecha.getFecha()
        },
        {
            name: "Till",
            surname: "Lindemann",
            birthday: "4-1-1963",
            phone: 777777777,
            email: "laichzeit@gmail.com",
            password: "$2a$12$RVcQSOJkNfLDwlXk79tguu5A22cs4NabdKCnG85HNk2HrSAuFbqxK",
            isActive: true,
            profile: "USER",
            createdDate: fecha.getFecha(),
            modifiedDate: fecha.getFecha()
        },
    ]

    await userModel.insertMany(user)
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })

    process.exit()
}

exec()