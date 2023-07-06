'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.changeColumn('users', 'cpf', {
            type: Sequelize.STRING(11),
            allowNull: false,
            unique: true,
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.removeColumn('users', 'cpf');
    },
};
