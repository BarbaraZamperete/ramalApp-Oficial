const Setor = require("../models/Setor");
const RamalF = require("../models/RamalF");

const sequelize = require('sequelize')
const db = require("../models/db");
const Servidor = require("../models/Servidor");
const async = require("hbs/lib/async");

async function adicionarRamal(ramal, tipo) {
  if (tipo == "ramalF") {
    const [[jaExiste]] = await db.query(
      `SELECT numero FROM ramalF WHERE (numero = ${ramal})`
    );
    if (jaExiste) {
      return;
    } else {
      await db.query(
        `INSERT INTO ramalF (Setor_id, numero, tipo) VALUES(1, ${ramal} , 'analógico');`
      );
    }
  } else if (tipo == "ramalV") {
    await db.query(
      `INSERT INTO ramalV (Servidor_matricula, numero, senha) VALUES ("0000000", ${ramal}, ${ramal});`
    );
  }

  console.log(ramal);
}

async function removerRamal(ramal, tipo) {
  const [[jaExiste]] = await db.query(
    `SELECT numero FROM ${tipo} WHERE (numero = ${ramal})`
  );
  if (!jaExiste) {
    return;
  } else {
    await db.query(`DELETE FROM ${tipo} WHERE (numero = ${ramal});`);
  }
}

// async function ressetarId(tabela) {

// }

async function retornarRamais(disponibilidade = false, tipo = false, setor = false, nome = false, matricula = false, numero = false){
  const [ramaisF] = await db.query(
    `SELECT * FROM ramalF`
  );
  const [ramaisV] = await db.query(
    `SELECT * FROM ramalV`
  );
  return [ramaisF, ramaisV]
}

module.exports = { adicionarRamal, removerRamal, retornarRamais };
