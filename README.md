# RamalApp-Oficial

Este é um projeto desenvolvido durante o estágio na Policia Federal em 2022. Não está finalizado ainda. 
O intuito deste site é criar um ambiente hospedado em um servidor local para gerenciar os Ramais da SR/RR, com o proposito de facilitar o acesso aos números de ramais virtuais e físicos

Projeto desenvolvido com Express, Node.js, Sequelize, SQL com banco de dados em MySQL, e Handlebars no FrontEnd.

Sequelize está sendo usado apenas para gerenciar Migrations e Seeds, as Query são feitas em SQL com o Sequelize.query().

# O que está sendo feito no momento:
- editar ramal
-- alocar ramalV a um servidor
-- alocar ramalF a um setor

# Próximas coisas a fazer:
- Entender como que raios a senha já entrou encriptada no DB (????)

- fazer as buscas no home (filtros)
- buscar servidor
- mensagem flash
- login
- proteger rotas com os perfis de acesso: 0(padrão), 1(adm), 2(superAdm)

# O que já foi feito:
- funções de inserção de faixas de ramal
- fazendo associações entre as tabelas do banco de dados
- boa parte do front end
- conexão com BD
- primeira migration
- pagina de editar ramal 
- primeiro seed (de teste)
- funções de inserção de servidores
- funções de inserção de setores




