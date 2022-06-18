const threedmController = require("../controllers/threed.controller");

const multerConfig = require("../configurations/multer");

const express = require("express");

const router = express.Router();

router.get("/api", threedmController.getAll);

router.post("/api", multerConfig.upload.single('modelstring'), threedmController.sendOne);

router.get("/api/:id", threedmController.getOne);

module.exports = router;