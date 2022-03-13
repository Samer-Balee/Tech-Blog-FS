const router = require('express').Router();

const {  User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
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

        // Pass posts data and session flag into template
    res.render('homepage', { 
        posts,
        logged_in: 
        req.session.logged_in
      });
    // res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
      }

});

router.get('/post/:id', withAuth, async (req, res) => {
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
        const post = postData.get({ plain: true });

        // Pass postss data and session flag into template
    res.render('single-post', { 
        post,
        logged_in: 
        req.session.logged_in
      });
    // res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
      }

});

router.get('/post-comments/:id', async (req, res) => {
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
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = postData.get({ plain: true });

        // Pass projects data and session flag into template
    res.render('post-commrnts', { 
        post,
        logged_in: 
        req.session.logged_in
      });
    // res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
      }

});


router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to home route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;