const app = require('./server');
const db = require('./models/db');
const associations = require('./models/associations')
require("dotenv").config();

const port = process.env.PORT;
//como usar o servidor apache n sei
app.listen(port, () => {
    console.log(`Servidor conectado em localhost:${port}`);
})

