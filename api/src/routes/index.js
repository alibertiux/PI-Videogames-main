const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const VideogamesRoutes = require("./VideogamesRoutes"); //traemos las rutas
const GanrersRoutes = require("./GenrersRoutes");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/api", VideogamesRoutes);
router.use("/api", GanrersRoutes);

module.exports = router;