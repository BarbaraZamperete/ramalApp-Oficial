const {
    Router
} = require('express');
const router = Router();
const sequelize = require('sequelize');



router.get("/add-setor", (req, res) => {
    res.render('setores/setores-add')
})
router.get("/search-setor", (req, res) => {
    res.render('setores/setores-consulta')
})




module.exports = router;
