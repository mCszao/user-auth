'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.addColumn('users', 'email', {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.removeColumn('users', 'email');
    },
};
