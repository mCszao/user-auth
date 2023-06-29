'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.addColumn('users', 'cpf', {
            type: Sequelize.SMALLINT,
            allowNull: false,
            unique: true,
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.removeColumn('users', 'cpf');
    },
};
