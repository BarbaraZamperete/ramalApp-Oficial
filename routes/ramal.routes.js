const { Router } = require("express");
const async = require("hbs/lib/async");
const router = Router();
const sequelize = require("sequelize");
const {
  adicionarRamal,
  removerRamal,
  retornarRamais
} = require("../controllers/ramalQuerys.controller");
const {listaSetores} = require("../controllers/setorQuery.controller")
const db = require("../models/db");

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
  res.redirect("home");
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
  const setores = await listaSetores();
  res.render("ramal/home", { ramaisF, ramaisV, setores});
});

//############### PAGINA DO RAMAL
router.get("/ramal-:id-:tipo", async (req, res) => {
  const {id, tipo} = req.params
  const ramal = await retornarRamais(id, null,  tipo, null, null, null, null, null)
  let controle
  if(tipo == 'fisico'){
    controle = 1
  }else if(tipo == 'virtual'){
    controle = 0
  }
  res.render("ramal/ramal-page", {ramal, controle});
});


router.get("/editar-:id-:controle", async ( req, res) => {
  const { id, controle} = req.params;
  let tipo
  const ramal =[]
  if (controle == 1){
    tipo = "fisico"
    ramal.push(await retornarRamais(id, null, tipo, null, null, null, null, null))
  } else if(controle == 0) {
    tipo = "virtual"
    ramal.push(await retornarRamais(id, null, tipo, null, null, null, null, null))
  }
  const setores = await listaSetores();
  res.render("ramal/editar-ramal", {ramal, tipo, setores});
})

router.post("/editar-:id-virtual", async (req, res) => {
  const { nome, matricula, cargo, senha, chefia} = req.body
  const {id} = req.params
  console.log(req.body);
  res.redirect("/home")
})
router.post("/editar-:id-fisico", async (req, res) => {
  const { nome, modelo, bastidor, slot, terminacao, grupo, categoria, observacao} = req.body
  const {id} = req.params;

  //Checar se o novo setor existe
  // const setor = await retornarSetor(null, nome);
  // if(setor){
  //   console.log(setor)
  // }else{
  //   console.log("Setor não existe, deseja criar um setor com esse nome?");
  // }


  res.redirect("/home")
});

router.get("/liberar-:id-:controle", async (req, res) => {
  res.redirect("/home");
});



module.exports = router;
