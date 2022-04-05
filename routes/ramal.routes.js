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
  liberarRamal
} = require("../controllers/ramalQuerys.controller");
const { listaSetores } = require("../controllers/setorQuery.controller");
const { listaServidores, allChefes } = require("../controllers/servidores.controler");
const db = require("../models/db");
const Setor = require("../models/Setor");

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

//############### EXIBIR RAMAIS

router.get("/home", async (req, res) => {
  const [ramaisF, ramaisV] = await retornarRamais();
  const chefes = await allChefes()
  //definir chefe cada ramalV que a matricula esta na allChefes()
  // console.log(chefes)
  const setores = await listaSetores();
  ramaisV.forEach((e)=>{
    if(chefes.includes(e.Servidor_matricula)){
      e.chefia = 1
    }else{
      e.chefia = 0
    }
  })
  // console.log(ramaisV)
  res.render("ramal/home", { ramaisF, ramaisV, setores });
});

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
  const {matricula, senha} = req.body;
  const { id } = req.params;
  //alocar ramal ao servidor
  console.log(id)
  await alocarEditarRamalServidor(id, matricula, senha)
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
  console.log(update);
  res.redirect("/home");
});

router.get("/liberar-:id-:controle", async (req, res) => {
  console.log(req.params);
  await liberarRamal(req.params.id, req.params.controle);
  res.redirect("/home");
});

module.exports = router;
