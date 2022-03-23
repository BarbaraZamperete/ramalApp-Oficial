const {
    Router
} = require('express');
const router = Router();
const sequelize = require('sequelize');




router.get("/search-servidor", (req, res) => {
    res.render('servidores/servidores-consulta')
})


module.exports = router;
