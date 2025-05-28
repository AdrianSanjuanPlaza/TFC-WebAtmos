const usersController = require("../controllers/users.controller") // Importa el controlador de users
const express = require("express") // Importamos Express
const router = express.Router() // Crea un enrutador para las rutas de users
const jwtMW = require("../middlewares/jwt.mw")
const { requireAdmin, requireUser } = require("../middlewares/rutasprotegidas.mw");

router.get("/",jwtMW.authenticate,requireAdmin, usersController.findAllUsers)//
router.get("/:id",jwtMW.authenticate,requireUser, usersController.findUserById)//
router.post("/logout", jwtMW.authenticate, usersController.logoutCSR)//
router.post("/", usersController.createUser)//
router.post("/login",usersController.login)//
router.patch("/:id",jwtMW.authenticate, requireUser,usersController.updateUser)//
router.patch("/toogle/:id", jwtMW.authenticate, requireAdmin, usersController.toogleState)
router.delete("/:id",jwtMW.authenticate,requireAdmin,usersController.deleteUserById)//
router.post("/validateemail", usersController.findUserEmail)
router.patch("/changepassword/:id", usersController.updateUserPassword)

module.exports = router