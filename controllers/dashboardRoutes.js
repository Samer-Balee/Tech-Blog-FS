const router = require('express').Router();

const {  User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
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
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        })
        const posts = postData.map(post => post.get({ plain: true }));
        console.log(posts);
        // Pass posts data and session flag into template
    res.render('dashboard', { 
        posts,
        logged_in: true
        });

    // res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
      }

});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
                
            ]
        })

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = postData.get({ plain: true });

        // Pass posts data and session flag into template
    res.render('edit-post', { 
        post,
        logged_in: true
      });
    // res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
      }

});

router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router;
