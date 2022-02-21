'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn(
      'ramaisF',
      'SetoresId',{
        type: Sequelize.INTEGER,
        references: {
          model: 'setores',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ).then(() => {
      return queryInterface.addColumn(
        'ramaisV',
        'ServidoresMatricula',
        {
          type: Sequelize.STRING,
          references: {
            model: 'servidores',
            key: 'matricula',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn(
      'ramaisF',
      'SetoresId'
    )
    ,then(() => {
      return queryInterface.removeColumn(
        'ramaisV',
        'ServidoresMatricula'
      )
    })
  }
};
