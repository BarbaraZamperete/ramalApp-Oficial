# RamalApp-Oficial

Este é um projeto desenvolvido durante o estágio na Policia Federal em 2022. Não está finalizado ainda. 
O intuito deste site é criar um ambiente hospedado em um servidor local para gerenciar os Ramais da SR/RR, com o proposito de facilitar o acesso aos números de ramais virtuais e físicos

Projeto desenvolvido com Express, Node.js, Sequelize, SQL com banco de dados em MySQL, e Handlebars no FrontEnd.

Sequelize está sendo usado apenas para gerenciar Migrations e Seeds, as Query são feitas em SQL com o Sequelize.query().

Para quem for continuar esse projeto: entrar em contato pelo email: bahzamp25@gmail.com para maiores explicações sobre as funcionalidades do app

# O que está sendo feito no momento:
- fazer as buscas no home (filtros)
- consultar servidor

# Próximas coisas a fazer:
- Entender como que raios a senha já entrou encriptada no DB (????) (OBS: NÂO TA MAIS ENCRIPTADA, SLA COMO)

- login
- proteger rotas com os perfis de acesso: 0(padrão), 1(adm), 2(superAdm)
- colocar estrela nos ramais das salas de chefia
- mensagem flash
- página inicial bonita

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
- alocar ramalV a um servidor
- editar ramal
- liberar ramal F e V
- colocar as estrelas dos chefes (ramal V)




