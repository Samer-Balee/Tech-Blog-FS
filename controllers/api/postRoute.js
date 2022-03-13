const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// router.get('/', async (req, res) => {
//     console.log('======================');
//     try {
//         const postData = await Post.findAll({
//             attributes: ['id',
//                 'title',
//                 'content',
//                 'created_at'
//             ],
//             order: [
//                 ['created_at', 'DESC']
//             ],
//             include: [{
//                 model: User,
//                 attributes: ['name']
//             },
//             {
//                 model: Comment,
//                 attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
//                 include: {
//                     model: User,
//                     attributes: ['name']
//                 }
//             }
//             ]
//         })
//         res.status(200).json(postData.reverse())
//     } catch (err) {
//         res.status(500).json(err);
//     };

// });

// router.get('/:id', async (req, res) => {
//     try {
//         const postData = await Post.findOne({
//             where: {
//                 id: req.params.id
//             },
//             attributes: ['id','content','title','created_at'],
//             include: [{
//                 model: User,
//                 attributes: ['name']
//             },
//             {
//                 model: Comment,
//                 attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
//                 include: {
//                     model: User,
//                     attributes: ['name']
//                 }
//             }
//             ]
//         })

//         if (!postData) {
//             res.status(404).json({ message: 'No post found with this id' });
//             return;
//         }
//         res.status(200).json(postData);

//     } catch (err) {
//         res.status(500).json(err);
//     };
// });
// CREATE POST
router.post('/', withAuth, async (req, res) => {
   
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        console.log(newPost);
        res.json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id
                }

            });
        if (!updatedPost) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
