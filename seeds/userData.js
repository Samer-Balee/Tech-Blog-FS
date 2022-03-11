const { User } = require('../models');

const userData = [{
        name: 'Sam',
        password: 'sam12345'

    },
    {
        name: 'Tom',
        password: 'tom12345'
    },
    {
        name: 'Steve',
        password: 'steve12345'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;