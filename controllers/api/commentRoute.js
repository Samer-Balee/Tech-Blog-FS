const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
          text: req.body.text,
          user_id: req.session.user_id,
          post_id: req.body.content,
      });
          
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.put('/', withAuth, async (req, res) => {
    try {
      const updatedComment = await Post.update(
          {
          text: req.body.text,
          
          },
          {
            where: {
                id: req.params.id
            }
        
      });
      if (!updatedComment) {
        res.status(404).json({ message: 'No post comment with this id' });
        return;
    }
      res.status(200).json(updatedComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  