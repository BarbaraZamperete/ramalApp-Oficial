const {
    Router
} = require('express');
const async = require('hbs/lib/async');
const router = Router();
const sequelize = require('sequelize');



router.get("/add-user", (req, res) => {
    res.render('add-user')
})

router.get("/login", (req,res) => {
    res.render('login')
})
router.post("/login", async (req, res) => {
    const {login, senha } = req.body;
    res.locals.user = login
    res.redirect("/home")
})


module.exports = router;
