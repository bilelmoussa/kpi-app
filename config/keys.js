require('dotenv').config();
let secret = process.env.SECRET || "SECRET";


module.exports = {
    database: "MongoDB_url",
    secret: secret,   
}