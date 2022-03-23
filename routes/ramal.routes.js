const { Router } = require("express");
const async = require("hbs/lib/async");
const router = Router();
const sequelize = require("sequelize");
const {
  adicionarRamal,
  removerRamal,
  retornarRamais,
} = require("../controllers/ramalQuerys.controller");

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
      //   removerRamal(ramal, "ramalF");
      ramal++;
    }
  }
  res.redirect("/add-ramal");
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
  res.redirect("/add-ramal");
});

//############### EXIBIR RAMAIS

router.get("/home", async (req, res) => {
  const [ramaisF, ramaisV] = await retornarRamais();
  res.render("ramal/home", { ramaisF, ramaisV});
});
router.get("/ramal:id:tipo", async (req, res) => {
  res.render("ramal/ramal-page");
});

module.exports = router;
