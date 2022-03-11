const router = require('express').Router();

const {  User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
            ]
        })
        const posts = postData.map(post => post.get({ plain: true }));

        // Pass projects data and session flag into template
    res.render('homepage', { 
        posts,
        loggedIn: 
        req.session.loggedIn
      });
    // res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
      }

});

module.exports = router;