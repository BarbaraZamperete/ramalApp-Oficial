const Setor = require("../models/Setor");
const RamalF = require("../models/RamalF");
const Servidor = require("../models/Servidor");

const { servidorExiste } = require("../controllers/servidores.controler");

const sequelize = require("sequelize");
const db = require("../models/db");
const async = require("hbs/lib/async");
const { cache } = require("hbs");
const RamalV = require("../models/RamalV");

async function adicionarRamal(ramal, tipo) {
  if (tipo == "ramalF") {
    const [[jaExiste]] = await db.query(
      `SELECT numero FROM ramalF WHERE (numero = ${ramal})`
    );
    if (jaExiste) {
      return;
    } else {
      await db.query(
        `INSERT INTO ramalF (Setor_id, numero, bastidor, slot, terminacao, tipo, grupo, categoria, observacao, disponibilidade) VALUES('1', ${ramal}, '', '', '', 'analógico', '', '', '', 0);`
      );
    }
  } else if (tipo == "ramalV") {
    await db.query(
      `INSERT INTO ramalV (Servidor_matricula, numero, senha, disponibilidade) VALUES ("0000000", ${ramal}, ${ramal}, 0);`
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
  ALTER TABLE ${tabela} AUTO_INCREMENT = '1'
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
    // const ramais = await RamalF.findAll({include: {model: Setor, as: "idSetor"}, order: ["numero"]})
    // ramais.forEach(element => {
    //   console.log(element.dataValues.idSetor)
    // });
    // const ramaisV = await RamalV.findAll({include: Servidor, order: ["numero"]})
    // const listaRamaisV = []
    // ramaisV.forEach(async function (ramal){

    //   let servidor = await Servidor.findOne({where: {matricula: ramal.Servidor_matricula}})
    //   // console.log(ramal, servidor.dataValues.chefia)
    //   listaRamaisV.push({ramalServidor: [ramal, servidor.dataValues.chefia]})
    //   // listaRamaisV.push(servidor.dataValues.chefia)
    // })
    // console.log(listaRamaisV)
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
  if (disponibilidade && modelo && setor && nome && matricula && numero) {
    const ramais = [];
    if (numero != "") {
      if (modelo == "virtual") {
        const ramaisV = await RamalV.findAll({
          where: { Servidor_matricula: matricula, numero: numero },
        });
      }
    }
  }
  return null;
}

async function alocarEditarRamalFisico(
  id,
  idSetor,
  modelo,
  bastidor,
  slot,
  terminacao,
  grupo,
  categoria,
  observacao
) {
  // const update = await db.query(
  //   `UPDATE ramalF SET Setor_id=${idSetor}, bastidor="${bastidor}", slot="${slot}", terminacao="${terminacao}", tipo="${modelo}", grupo="${grupo}", categoria="${categoria}", observacao="${observacao}" WHERE id=${id}`
  // );
  let disponibilidade;
  if (idSetor != 0) {
    disponibilidade = 1;
  }
  const query = `UPDATE RamalF SET Setor_id= ${idSetor}, bastidor= "${bastidor}", slot= "${slot}", terminacao= "${terminacao}", tipo= "${modelo}", grupo= "${grupo}", categoria= "${categoria}", observacao= "${observacao}", disponibilidade= ${disponibilidade}`;

  // const update = await RamalF.update(
  //   {
  //     Setor_id: idSetor,
  //     bastidor: bastidor,
  //     slot: slot,
  //     terminacao: terminacao,
  //     tipo: modelo,
  //     grupo: grupo,
  //     categoria: categoria,
  //     observacao: observacao,
  //     disponibilidade: disponibilidade,
  //   },
  //   { where: { id: id } }
  // );
  const update = db.query(query);
  return update;
}

async function alocarEditarRamalServidor(idRamal, matricula, senha) {
  //checar se a matricula existe
  const servidor = await servidorExiste(matricula);
  if (servidor) {
    //se sim, checar se esse servidor já possui um ramal virtual
    if (!servidor.dataValues.RamalV) {
      const ramal = await RamalV.findOne({ where: { id: idRamal } });
      servidor.setRamalV(ramal);
      if (servidor.dataValues.matricula != "0000000") {
        await ramal.update(
          { disponibilidade: 1 },
          { where: { id: idRamal } }
        );
      }
    }
    //se não, alocar ramal a esse servidor
  }
  return;
}

async function liberarRamal(id, controle) {
  if (controle == "1") {
    return await db.query(
      `UPDATE ramalF SET Setor_id = 1, bastidor = "", terminacao = "", slot = "", tipo = "analógico", grupo = "", categoria = "", observacao = "", disponibilidade = 0  WHERE id = ${id}`
    );
  } else if (controle == "0") {
    return await RamalV.update(
      { Servidor_matricula: "0000000", disponibilidade: 0 },
      { where: { id: id } }
    );
  }
}




module.exports = {
  adicionarRamal,
  removerRamal,
  retornarRamais,
  alocarEditarRamalFisico,
  alocarEditarRamalServidor,
  liberarRamal,
};
