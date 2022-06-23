'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    // await queryInterface.bulkInsert('Categories', [{
    //   category_name: 'Diversão',
    //   user_id: 1,
    //   category_total: 0,
    //   createdAt: "2022-06-22 18:49:48",
    //   updatedAt: "2022-06-22 18:49:48"
    // }], {});
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
