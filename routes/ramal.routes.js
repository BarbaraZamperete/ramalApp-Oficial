const {
    Router
} = require('express');
const router = Router();
const sequelize = require('sequelize');


router.get("/alocar", async (req,res) => {
    res.render('alocar')
})
router.get("/add-ramal", async (req,res) => {
    res.render('adicionar-ramal')
})

module.exports = router;
