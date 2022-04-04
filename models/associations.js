const Servidor = require("./Servidor");
const RamalF = require("./RamalF");
const RamalV = require("./RamalV");
const Setor = require("./Setor");

Servidor.hasOne(RamalV, {foreignKey: "Servidor_matricula"});
RamalV.belongsTo(Servidor, {foreignKey: "Servidor_matricula"});

Setor.hasMany(RamalF, {foreignKey: "id"});
RamalF.belongsTo(Setor, {foreignKey: "id"});

Setor.belongsToMany(Servidor, {through: 'Setor_Servidor'})
Servidor.belongsToMany(Setor, {through: 'Setor_Servidor'});