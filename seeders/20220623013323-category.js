'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    // await queryInterface.bulkInsert('Categories', [{
    //   categoryName: 'Diversão',
    //   userID: 1,
    //   categoryTotal: 0,
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
