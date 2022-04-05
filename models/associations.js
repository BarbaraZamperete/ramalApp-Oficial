const Servidor = require("./Servidor");
const RamalF = require("./RamalF");
const RamalV = require("./RamalV");
const Setor = require("./Setor");

Servidor.hasOne(RamalV, {foreignKey: "Servidor_matricula"});
RamalV.belongsTo(Servidor, {foreignKey: "Servidor_matricula"});

Setor.hasMany(RamalF, {foreignKey: "id",  as: "idSetor"});
RamalF.belongsTo(Setor, {foreignKey: "id", as: "idSetor"});

Setor.belongsToMany(Servidor, {through: 'Setor_Servidor'})
Servidor.belongsToMany(Setor, {through: 'Setor_Servidor'});