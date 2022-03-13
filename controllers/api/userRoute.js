const router = require('express').Router();
const { User } = require('../../models');

// router.get('/', async (req, res) => {
//   try {
//   const userData = await User.findAll({
//           attributes: { exclude: ['[password'] }
//       })
//       res.status(200).json(userData);
//     } catch(err) {
//           console.log(err);
//           res.status(500).json(err);
//       };
// });

// router.get('/:id', async (req, res) => {
//   try {
//   const userData = await User.findOne({
//           attributes: { exclude: ['password'] },
//           where: {
//               id: req.params.id
//           },
//           include: [{
//                   model: Post,
//                   attributes: [
//                       'id',
//                       'title',
//                       'content',
//                       'created_at'
//                   ]
//               },

//               {
//                   model: Comment,
//                   attributes: ['id', 'text', 'created_at'],
//                   include: {
//                       model: Post,
//                       attributes: ['title']
//                   }
//               },
//               {
//                   model: Post,
//                   attributes: ['title'],
//               }
//           ]
//       })
      
//           if (!userData) {
//               res.status(404).json({ message: 'No user found with this id' });
//               return;
//           }
//           res.json(userData);
      
//     }catch(err) {
//           console.log(err);
//           res.status(500).json(err);
//       };
// });


// router.post('/', async (req, res) => {
//     try {
//       const newUser = await User.create(
//         {
//           name: req.body.name,
//           password: req.body.password
//         });
  
//         req.session.save(() => {
//           req.session.user_id = newUser.id;
//           req.session.name = newUser.name;
//           req.session.logged_in = true;
    
//           res.json(newUser);
//         });
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   });

  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { name: req.body.name } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'No user with that username!' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
      console.log(validPassword);
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.name = userData.name;
        req.session.logged_in = true;
  
        res.json({ userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  module.exports = router;