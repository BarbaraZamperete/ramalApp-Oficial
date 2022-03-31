const { Router } = require("express");
const { and } = require("sequelize");
const router = Router();
const sequelize = require("sequelize");
const Setor = require("../models/Setor");
const {
  adicionarSetor,
  deletarSetor,
} = require("../controllers/setorQuery.controller");
const async = require("hbs/lib/async");

router.get("/search-setor", async (req, res) => {
  const allSetores = await Setor.findAll();
  const setoresLista = [];
  allSetores.forEach((setor) => {
    setoresLista.push(setor.dataValues);
  });
  res.render("setores/setores-consulta", { setoresLista });
});

router.get("/add-setor", (req, res) => {
  res.render("setores/add-setor");
});

router.post("/add-setor", async (req, res) => {
  const { nome, andar } = req.body;

  const setor = await adicionarSetor(nome, andar);
  if (setor == null) {
    console.log(setor);
  }
  res.redirect("/search-setor");
});

router.get("/deletar/setor-:id", async (req, res, next) => {
  console.log(await deletarSetor(req.params.id));
  res.redirect("/search-setor");
});

module.exports = router;
