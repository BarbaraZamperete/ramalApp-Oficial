// const db = require('./index');
// const Sequelize = require('sequelize');

// const Setor = db.define('Setor', {
//     nome: {
//         type: Sequelize.STRING,
//         primaryKey: true,
//         allowNull: false
//     },
//     andar: Sequelize.STRING
// }, {
//     tableName: 'Setor'
// });

// const RamalF = db.define('RamalF', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     numero: Sequelize.STRING,
//     bastidor: Sequelize.STRING,
//     slot: Sequelize.STRING,
//     terminacao: Sequelize.STRING,
//     tipo: Sequelize.STRING,
//     grupo: Sequelize.STRING,
//     categoria: Sequelize.STRING,
//     observacao: Sequelize.STRING,
// }, {
//     tableName: 'RamalF'
// });

// const Pessoa = db.define('Pessoa', {
//     nome: Sequelize.STRING,
//     matricula: {
//         type: Sequelize.STRING,
//         primaryKey: true,
//         allowNull: false
//     },
//     cargo: Sequelize.STRING,
//     chefia: Sequelize.INTEGER
// }, {
//     tableName: 'Pessoa'
// })

// const RamalV = db.define("RamalV", {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     numero: Sequelize.STRING,
//     senha: Sequelize.STRING,
// }, {
//     tableName: 'RamalV'
// })

// const User = db.define("User", {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     login: Sequelize.STRING,
//     senha: Sequelize.STRING,
//     role: Sequelize.INTEGER
// }, {
//     tableName: 'User'
// })
// // const Setor_Pessoa = db.define('Setor_Pessoa', {}, { timestamps: false });

// Setor.hasMany(RamalF, {as: "Ramais"});
// RamalF.belongsTo(Setor, {as: "Ramais"});

// Pessoa.hasMany(RamalV, {as: "Virtuais"});
// RamalV.belongsTo(Pessoa, {as: "Virtuais"});

// Setor.belongsToMany(Pessoa, { through: "setor_pessoa", as: "pessoas"});
// Pessoa.belongsToMany(Setor, { through: "setor_pessoa", as: "setores"});


// // Setor_Pessoa.sync();
// db.sync({alter: true});

// module.exports = {
//     Setor,
//     RamalF,
//     User,
//     Pessoa,
//     RamalV
// };