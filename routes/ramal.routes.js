const { Router } = require("express");
const async = require("hbs/lib/async");
const router = Router();
const sequelize = require("sequelize");
const {
  adicionarRamal,
  removerRamal,
  retornarRamais,
  alocarEditarRamalFisico,
  alocarEditarRamalServidor,
  liberarRamal,
} = require("../controllers/ramalQuerys.controller");
const { listaSetores } = require("../controllers/setorQuery.controller");
const {
  listaServidores,
  allChefes,
} = require("../controllers/servidores.controler");
const db = require("../models/db");
const Setor = require("../models/Setor");
const RamalF = require("../models/RamalF");
const { where } = require("sequelize");
const Servidor = require("../models/Servidor");
const RamalV = require("../models/RamalV");

router.get("/alocar", async (req, res) => {
  res.render("ramal/alocar");
});
router.get("/add-ramal", async (req, res) => {
  res.render("ramal/adicionar-ramal");
});

//############### FISICOOOOOOOOOOOOOO
router.post("/add-ramal-f", async (req, res) => {
  const { inicioFaixa, fimFaixa } = req.body;
  if (!inicioFaixa || !fimFaixa) {
    console.log("Mensagem flash: Preencha tudo");
  } else {
    let ramal = inicioFaixa;
    for (let i = 0; i <= fimFaixa - inicioFaixa; i++) {
      adicionarRamal(ramal, "ramalF");
      // removerRamal(ramal, "ramalF");
      ramal++;
    }
  }
  res.redirect("/home");
});

//############### VIRTUALLLLLLLL
router.post("/add-ramal-v", async (req, res) => {
  const { inicioFaixa, fimFaixa } = req.body;
  if (!inicioFaixa || !fimFaixa) {
    console.log("Mensagem flash: Preencha tudo");
  } else {
    let ramal = inicioFaixa;
    for (let i = 0; i <= fimFaixa - inicioFaixa; i++) {
      adicionarRamal(ramal, "ramalV");
      // removerRamal(ramal, "ramalV");
      ramal++;
    }
  }
  res.redirect("/home");
});

//############### EXIBIR RAMAIS #################################
// ###############################################################
// ###############################################################
// ###############################################################
// ###############################################################

router.get("/home", async (req, res) => {
  const setores = await listaSetores();
  const chefes = await allChefes();
  //se não tem nenhum filtro
  let filtros = 0
  if (!req.session.filtro) {
    const [ramaisF, ramaisV] = await retornarRamais();
    //define os ramais de chefes
    ramaisV.forEach((e) => {
      if (chefes) {
        if (chefes.includes(e.Servidor_matricula)) {
          e.chefia = 1;
        } else {
          e.chefia = 0;
        }
      }
    });
    res.render("ramal/home", { ramaisF, ramaisV, setores, filtros });

    //se tem filtro
  } else {
    filtros = 1
    // transforma o filtro em query
    let filtroData = req.session.filtro
    const query = Object.keys(req.session.filtro)
      .map((key) => `${key}="${req.session.filtro[key]}"`)
      .join("&");

    //se o filtro é do tipo FISICO
    if (req.session.filtroTipo == "fisico") {
      const [ramaisF] = await db.query(
        `SELECT id, numero, disponibilidade FROM ramalF WHERE ${query}`
      );
      res.render("ramal/home", { ramaisF, setores, filtros });

      //se o filtro é do tipo virtual
    } else if (req.session.filtroTipo == "virtual") {
      const ramais = await RamalV.findAll({ where: req.session.filtro });
      const ramaisV = [];
      ramais.forEach((ramal) => {
        ramaisV.push(ramal.dataValues);
      });
      res.render("ramal/home", { ramaisV, setores, filtros });

      //se o filtro não é fisico nem virtual, ou seja: QUALQUER
    } else {
      const queryFiltroSemTipo = {};
      // se o tipo é qualquer, verifica se há filtro de NUMERO e de DISPONIBILIDADE
      if (req.session.filtro.numero && (req.session.filtro.disponibilidade==1 || req.session.filtro.disponibilidade==0)) {
        //se tiver filtra pelos dois os dois tipos de ramais
        queryFiltroSemTipo.numero = req.session.filtro.numero;
        queryFiltroSemTipo.disponibilidade = req.session.filtro.disponibilidade;
      } else {
        //se não tem os dois, verifica se tem o filtro de disponibilidade
        if (req.session.filtro.disponibilidade == 0 || req.session.filtro.disponibilidade == 1) {
          queryFiltroSemTipo.disponibilidade = req.session.filtro.disponibilidade;
          //se não tem o de disponibilidade, verifica se tem o de numero
        } else if (req.session.filtro.numero) {
          queryFiltroSemTipo.numero = req.session.filtro.numero;
        }
      }
      //aplica a busca de acordo com a QueryFiltroSemTipo
      const ramalF = await RamalF.findAll({
        where: queryFiltroSemTipo,
      });
      const ramalV = await RamalV.findAll({
        where: queryFiltroSemTipo,
      });
      const ramaisV = [];
      ramalV.forEach((ramal) => {
        ramaisV.push(ramal.dataValues);
      });
      const ramaisF = [];
      ramalF.forEach((ramal) => {
        ramaisF.push(ramal.dataValues);
      });
      res.render("ramal/home", { ramaisV, ramaisF, setores, filtros });
    }
  }
  req.session.filtro = null;
  req.session.filtroTipo = null;
});

// ###############################################################
// ###############################################################
// ###############################################################
// ###############################################################
// ###############################################################

//############### PAGINA DO RAMAL
router.get("/ramal-:id-:tipo", async (req, res) => {
  const { id, tipo } = req.params;
  const ramal = await retornarRamais(
    id,
    null,
    tipo,
    null,
    null,
    null,
    null,
    null
  );
  let controle;
  if (tipo == "fisico") {
    controle = 1;
  } else if (tipo == "virtual") {
    controle = 0;
  }
  res.render("ramal/ramal-page", { ramal, controle });
});

// EDITAR RAMAL ##################

router.get("/editar-:id-:controle", async (req, res) => {
  const { id, controle } = req.params;
  let tipo;
  const ramal = [];
  if (controle == 1) {
    tipo = "fisico";
    ramal.push(
      await retornarRamais(id, null, tipo, null, null, null, null, null)
    );
  } else if (controle == 0) {
    tipo = "virtual";
    ramal.push(
      await retornarRamais(id, null, tipo, null, null, null, null, null)
    );
  }
  const setores = await listaSetores();
  const servidores = await listaServidores();
  res.render("ramal/editar-ramal", { ramal, tipo, setores, servidores });
});

router.post("/editar-:id-virtual", async (req, res) => {
  const { matricula, senha } = req.body;
  const { id } = req.params;
  //alocar ramal ao servidor
  await alocarEditarRamalServidor(id, matricula, senha);
  res.redirect("/home");
});

router.post("/editar-:id-fisico", async (req, res) => {
  const {
    setor,
    modelo,
    bastidor,
    slot,
    terminacao,
    grupo,
    categoria,
    observacao,
  } = req.body;
  const { id } = req.params;
  const update = await alocarEditarRamalFisico(
    id,
    setor,
    modelo,
    bastidor,
    slot,
    terminacao,
    grupo,
    categoria,
    observacao
  );
  res.redirect("/home");
});

router.get("/liberar-:id-:controle", async (req, res) => {
  await liberarRamal(req.params.id, req.params.controle);
  res.redirect("/home");
});

// ########## FILTRO ####################
router.post("/ramais/filtro", async (req, res) => {
  const { disponibilidade, modelo, setor, matricula, numero } = req.body;
  const camposFiltrar = new Object();
  if (numero != "") {
    camposFiltrar.numero = numero;
  }
  if (disponibilidade != "") {
    camposFiltrar.disponibilidade = parseInt(disponibilidade);
  }
  //se for virtual
  if (modelo == "virtual") {
    if (matricula != "") {
      camposFiltrar.matricula = matricula;
    }

    req.session.filtro = camposFiltrar;
    req.session.filtroTipo = "virtual";
    res.redirect("/home");
  }
  //se for FISICO
  else if (modelo != "virtual" && modelo != "") {
    //é ramal fisico
    camposFiltrar.tipo = modelo;
    if (setor != "") {
      camposFiltrar.Setor_id = setor;
    }
    // const ramais = await RamalF.findAll({where: camposFiltrar});
    // const ramaisF = ramais.dataValues
    // res.render("ramal/home", {ramaisF, setores})
    req.session.filtro = camposFiltrar;
    req.session.filtroTipo = "fisico";
    res.redirect("/home");
  }
  //Se for qualquer tipo: fisico e virtual
  else {
    // const ramalF = await RamalF.findAll({where: camposFiltrar})
    // const ramalV = await RamalV.findAll({where: camposFiltrar})
    // const ramaisV = []
    // const ramaisF = []
    // ramalF.forEach((ramal) => {
    //   ramaisF.push(ramal.dataValues)
    // })
    // ramalV.forEach((ramal) => {
    //   ramaisV.push(ramal.dataValues)
    // })
    req.session.filtro = camposFiltrar;
    if (numero == "" && disponibilidade == "") {
      req.session.filtro = null;
    }
    req.session.filtroTipo = null;
    res.redirect("/home");
  }
});

module.exports = router;
