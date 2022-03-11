const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedComments = require('./commentData');
const seedPosts = require('./postData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedPosts();
  await seedComments();

  process.exit(0);
};

seedAll();