'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return await queryInterface.bulkInsert(
     'Users',
     [
       {
         firstName: "Pere",
         lastName: 'Jumbo',
         email: 'jumboperebara0@gmail.com',
         password: 'biology1',
         createdAt: new Date(),
         updatedAt: new Date()
       }
     ],
     {}
   );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('Users', null, {})
  }
};
