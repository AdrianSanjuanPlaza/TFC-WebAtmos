const requestsController = require("../controllers/requests.controller") // Importa el controlador de requests
const express = require("express") // Importamos Express
const router = express.Router() // Crea un enrutador para las rutas de users
const jwtMW = require("../middlewares/jwt.mw")
const { requireAdmin, requireUser } = require("../middlewares/rutasprotegidas.mw");

router.get("/", jwtMW.authenticate, requireUser, requestsController.findAllRequest)
router.get("/:id", jwtMW.authenticate, requireUser, requestsController.findRequestById)
router.post("/new", jwtMW.authenticate, requireUser, requestsController.createRequest)
router.patch("/:id", jwtMW.authenticate, requireUser, requestsController.editRequestUser)
router.patch("/state/:id", jwtMW.authenticate, requireAdmin, requestsController.changeRequestState)
router.delete("/:id", jwtMW.authenticate, requireUser, requestsController.deleteRequest)

module.exports = router