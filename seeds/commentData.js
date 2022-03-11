const { Comment } = require('../models');

const commentData = [{
        text: 'Awesome',
        user_id: 1,
        post_id: 1
    },
    {
        text: 'Very good',
        user_id: 2,
        post_id: 2
    },
    {
        text: 'hh hhfue  euii ifk kfkj.',
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;