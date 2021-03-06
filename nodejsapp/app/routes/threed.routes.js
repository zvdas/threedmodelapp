const threedmController = require("../controllers/threed.controller");

const multerConfig = require("../configurations/multer");

const express = require("express");

const router = express.Router();

router.get("/api", threedmController.getAll);

router.post("/api", multerConfig.upload.single('modelstring'), threedmController.sendOne);

router.get("/api/:filename", threedmController.getByFilename);

router.delete("/api/:filename", threedmController.deleteByFilename);

module.exports = router;