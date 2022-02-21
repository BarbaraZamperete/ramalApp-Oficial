const app = require('./server');
// const RamalF = require('./Models/RamalF')
// const Setor = require('./Models/Setor')
// const associations = require('./models/associations')
const db = require('./models/db');

//como usar o servidor apache n sei
app.listen(3000, () => {
    console.log("Servidor conectado na porta 3000");
})

