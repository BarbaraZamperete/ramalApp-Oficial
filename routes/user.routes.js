const {
    Router
} = require('express');
const router = Router();
const sequelize = require('sequelize');



router.get("/add-user", (req, res) => {
    res.render('add-user')
})

router.get("/login", (req,res) => {
    res.render('login')
})


module.exports = router;
