const async = require("hbs/lib/async");
const sequelize = require("sequelize");
const db = require("../models/db");
const Setor = require("../models/Setor");
const Servidor = require("../models/Servidor");
const RamalV = require("../models/RamalV")

async function addServidor(nome, matricula, cargo, setorNome, chefia) {
  const created = await Servidor.findOne({ where: { matricula: matricula } });
  if (!created) {
    // const servidor = db.query(`
    // INSERT INTO Servidor (nome, matricula, cargo, chefia)
    // VALUES (${nome}, ${matricula}, ${cargo}, ${chefia})`)
    const servidor = await Servidor.create({
      nome: nome,
      matricula: matricula,
      cargo: cargo,
      chefia: chefia,
    });
    const setor = await Setor.findOne({ where: { nome: setorNome } });
    const setor_servidor = await db.query(
      `INSERT INTO Setor_Servidor VALUES (${setor.dataValues.id}, "${servidor.dataValues.matricula}")`
    );
    console.log(servidor, setor, setor_servidor);
    return servidor;
  } else {
    return null;
  }
}

async function listaServidores() {
  const allServidores = await Servidor.findAll();
  const listaServidores = [];
  allServidores.forEach((servidor) => {
    listaServidores.push(servidor.dataValues);
  });
  return listaServidores;
}

async function servidorExiste(matricula){
    return await Servidor.findOne({where: {matricula: matricula}, include: [{model: RamalV}]})
}

module.exports = { addServidor, listaServidores, servidorExiste };
