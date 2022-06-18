const dotenv = require("dotenv");

dotenv.config({ path: '.env' });

const mongoose = require("mongoose");

/*
//local
var url = 'mongodb://localhost:27017/threedm_db';
*/

//shared cluster
var url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(
    url, 
    {
        server: { 
            socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } 
        }, 
        replset: {
            socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } 
        }
    }, 
    (err) => {
        if(!err){
            console.log("Connection to MongoDB Successful");
        }else{
            console.log(`Connection to MongoDB Failed with error : ${JSON.stringify(err, undefined, 2)}`);
        }
    }
)

module.exports = mongoose;