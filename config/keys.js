require('dotenv').config();
let secret = process.env.SECRET || "SECRET";


module.exports = {
    database: "mongodb://bilel123:Azertyub1_@3dwave-shard-00-00-xwprz.mongodb.net:27017,3dwave-shard-00-01-xwprz.mongodb.net:27017,3dwave-shard-00-02-xwprz.mongodb.net:27017/test?ssl=true&replicaSet=3dwave-shard-0&authSource=admin&retryWrites=true",
    secret: secret,   
}