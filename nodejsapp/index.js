const express = require("express");

const { mongoose } = require("./app/configurations/mongodb");
// nodejsapp\app\configurations\database.js );

const cors = require("cors");

const helmet = require("helmet");

const compression = require('compression');

const threedmRoutes = require("./app/routes/threed.routes");

// const path = __dirname + '/app/views/';

const path = __dirname + "../../angularapp/dist/angularapp";

const app = express();

// app.use(helmet());

// app.use(compression());

app.use(express.static(path + "/index.html"));

// app.use(cors({ origin: 'http://localhost:4200' }));

app.use(cors({ origin: 'https://threedmodelapp.herokuapp.com/' }));

// parse requests of content-type - application/json
app.use(express.json({ limit: '50mb' }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/threed', threedmRoutes);

app.get("/", (req, res) => {
    res.json({message : `Welcome to the 3D Model Application`});
    // res.sendFile(process.cwd() + '/startpage.html');
    // res.sendFile(path + "index.html")
})

app.listen(process.env.PORT || 4000, ()=>{
    console.log("The Server is listening on port 4000");
})