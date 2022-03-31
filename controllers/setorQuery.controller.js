const async = require("hbs/lib/async");
const sequelize = require("sequelize");
const db = require("../models/db");
const Setor = require("../models/Setor");

async function adicionarSetor(nome, andar) {
  const created = await Setor.findOne({ where: { nome: nome } });
  if (!created) {
    return await Setor.create({ nome: nome, andar: andar });;
  } else {
    return null;
  }
}

async function deletarSetor(id){
  const deleted = await Setor.destroy({where: {id: id}});
  return deleted
}

async function listaSetores(){
  const allSetores = await Setor.findAll();
  const listaSetores = []
  allSetores.forEach((setor)=>{
    if(setor.dataValues.id != 1){
      listaSetores.push(setor.dataValues);
    }
  })
  return listaSetores
}

module.exports = { adicionarSetor, deletarSetor, listaSetores };
