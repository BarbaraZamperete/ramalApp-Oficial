const {
    Router
} = require('express');
const router = Router();
const sequelize = require('sequelize');
const {listaSetores} = require("../controllers/setorQuery.controller")
const { addServidor } = require("../controllers/servidores.controler")



router.get("/search-servidor", (req, res) => {
    res.render('servidores/servidores-consulta')
})


router.get("/add-servidor", async (req, res) => {
    const setores = await listaSetores()
    res.render('servidores/add-servidores', {setores})
})
router.post("/add-servidor", async (req, res) => {
    const { nome, matricula, cargo, nomeSetor, chefia } = req.body;
    
    const adicionar = await addServidor(nome, matricula, cargo, nomeSetor, chefia)
    console.log(adicionar)
    res.redirect("/add-servidor");
})


module.exports = router;
