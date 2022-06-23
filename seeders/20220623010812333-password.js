'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    await queryInterface.bulkInsert('Passwords', [{
      content_name: 'Netflix',
      password: '12345678',
      user_id: 1,
      category_id: 1,
      createdAt: "2022-06-22 18:49:48",
      updatedAt: "2022-06-22 18:49:48"
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
