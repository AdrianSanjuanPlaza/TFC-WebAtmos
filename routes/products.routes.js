const productController = require("../controllers/products.controller") 
const express = require("express")
const router = express.Router()
const jwtMW = require("../middlewares/jwt.mw")
const { requireAdmin, requireUser } = require("../middlewares/rutasprotegidas.mw")

router.get("/", productController.findAllProducts)
router.get("/:id", productController.findProductById)
router.patch("/:id",jwtMW.authenticate,requireAdmin, productController.editProductById)


module.exports = router // Exporta el enrutador para su uso en la aplicación principal