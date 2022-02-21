const {
    Router
} = require('express');
const router = Router();
const sequelize = require('sequelize');
const db = require('../models/index')

const { Setor, RamalF, Pessoa, RamalV} = require('../models/associations')



router.get('/', async (req,res) => {
    res.render('index');
})


router.get("/home", async (req,res) => {
    res.render("home")
    
});










// router.post('/add-rv', async (req, res) => {
//     const { numero, pessoa } = req.body;
//     console.log(numero, pessoa);
//     const ramalv = await RamalV.create(
//         {numero: numero}
//     )
//     const pessoaB = await Pessoa.findByPk(pessoa);
//     pessoaB.setVirtuais(numero)
//     pessoaB.save()
//     // ramalv.setVirtuais({where: {matricula: pessoa}});
//     res.render('index');
// })
// router.post('/add-rf', (req, res) => {
//     const { numero, setor } = req.body;
//     console.log(numero, setor);
//     res.render('index');
// })
// router.post('/add-setor', async (req, res) => {
//     const { nome } = req.body;
//     console.log(nome);
//     const setor = await Setor.create({
//         nome: nome
//     })
//     res.render('index');
// })
// router.post('/add-pessoa', async (req, res) => {
//     const { matricula, nome_setor } = req.body;
//     console.log( matricula, nome_setor);
//     const pessoa = await Pessoa.create({
//         matricula: matricula
//     });
//     pessoa.setSetores(nome_setor);
//     res.render('index');
// })
module.exports = router;
