const { Post } = require('../models');

const postData = [{
        title: 'Life',
        content: 'abc djfjfj jjjgkkk kkdlsllsl',
        user_id: 1

    },
    {
        title: 'World',
        content: 'hhhh hhhjkj kkkejeuur dsbbcbh eikeki',
        user_id: 2
    },
    {
        title: 'Moon',
        content: 'Sf fdf dfkk kkk lelefol ldkf kel',
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;