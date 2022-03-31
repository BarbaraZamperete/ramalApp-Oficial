const Setor = require("../models/Setor");
const RamalF = require("../models/RamalF");

const sequelize = require("sequelize");
const db = require("../models/db");
const Servidor = require("../models/Servidor");
const async = require("hbs/lib/async");
const { cache } = require("hbs");

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
}

async function removerRamal(ramal, tipo) {
  const [[jaExiste]] = await db.query(
    `SELECT numero FROM ${tipo} WHERE (numero = ${ramal})`
  );
  if (!jaExiste) {
    return;
  } else {
    await db.query(`DELETE FROM ${tipo} WHERE (numero = ${ramal});`);
    await ressetarId(tipo);
  }
}

async function ressetarId(tabela) {
  await db.query(`
  ALTER TABLE ${tabela} AUTO_INCREMENT = 1
  `);
}

async function retornarRamais(
  id = false,
  disponibilidade = false,
  tipo = false,
  modelo = false,
  setor = false,
  nome = false,
  matricula = false,
  numero = false
) {
  //Se não tiver nenhum parametro retorna todos os ramais
  if (
    !id &&
    !disponibilidade &&
    !modelo &&
    !tipo &&
    !setor &&
    !nome &&
    !matricula &&
    !numero
  ) {
    const [ramaisF] = await db.query(`SELECT * FROM ramalF ORDER BY numero`);
    const [ramaisV] = await db.query(`SELECT * FROM ramalV ORDER BY numero`);
    return [ramaisF, ramaisV];
  }
  //Se tiver só o TIPO e o ID
  if (tipo && id) {
    if (tipo == "fisico") {
      const [[ramal]] = await db.query(
        `SELECT r.id, r.Setor_id, r.numero, r.bastidor, r.slot, r.terminacao, r.tipo, r.grupo, r.categoria, r.observacao, s.nome, s.andar FROM ramalF as r, Setor as s WHERE (r.id = ${id} AND s.id = r.Setor_id)`
      );
      return ramal;
    }
    if (tipo == "virtual") {
      const [[ramal]] = await db.query(
        `SELECT * FROM ramalV INNER JOIN Servidor ON Servidor.matricula = ramalV.Servidor_matricula WHERE (ramalV.id = ${id})`
      );

      return ramal;
    }
  }
  return null;
}

// async function updateRamalFisico(
//   id,
//   idSetor,
//   modelo,
//   bastidor = false,
//   slot = false,
//   terminacao = false,
//   grupo = false,
//   categoria = false,
//   observacao = false
// ) {
//   const update = db.query(`UPDATE ramalF SET Setor_id=${idSetor}, modelo=${modelo}, grupo=${grupo}, categoria=${categoria}, observacao=${observacao}`);
// }

// async function retornarNomeTodosSetores() {
//   const [listaNomeSetores] = await db.query(`SELECT nome FROM Setor`);
//   return listaNomeSetores;
// }

// async function retornarSetor(id = false, nome = false) {
//   if (id) {
//     console.log("Só tem o id");
//     return null;
//   }
//   if (nome) {
//     const listaSetores = await retornarNomeTodosSetores();
//     //checar se o novo setor existe
//     var setorExist = false;
//     listaSetores.forEach((element) => {
//       if (element.nome == nome) {
//         setorExist = true;
//       }
//     });
//     const [[setor]] = await db.query(
//       `SELECT * FROM setor WHERE nome="${nome}"`
//     );
//     return setor;
//   }
// }

module.exports = {
  adicionarRamal,
  removerRamal,
  retornarRamais
};
