'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    // await queryInterface.bulkInsert('Users', [{
    //   email: 'teste@email.com',
    //   userName: 'test',
    //   password: '12345678',
    //   isActive: false,
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
