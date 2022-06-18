const express = require("express");

const { mongoose } = require("./app/configurations/mongodb");

const cors = require("cors");

const threedmRoutes = require("./app/routes/threed.routes");

const path = __dirname + '/app/views/';

const app = express();

app.use(express.static(path));

// app.use(cors({ origin: 'http://localhost:4200' }));

app.use(cors({ origin: 'https://threedmodelapp.herokuapp.com/threed/api' }));

// parse requests of content-type - application/json
app.use(express.json({ limit: '50mb' }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/threed', threedmRoutes);

app.get("/", (req, res) => {
    res.sendFile(path + "index.html")
})

app.listen(process.env.PORT || 4000, ()=>{
    console.log("The Server is listening on port 4000");
})