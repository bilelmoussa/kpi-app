require('dotenv').config();
let secret = process.env.SECRET || "SECRET";


module.exports = {
    database: "mongodb+srv://bilel123:Azertyub1_@3dwave-xwprz.mongodb.net/test?retryWrites=true",
    secret: secret,   
}