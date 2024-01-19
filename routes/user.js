// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });


router.get('/', (req, res) => {
  res.render('user-login');
});

router.post('/', async (req, res) => {
  const { userId, password } = req.body;

  try{

    const user = await User.findOne({ userId, password});

    if(user){
      req.session.user = user;
      res.redirect('/profile');
    } else{
      console.log('Invalid Credentials');
      res.redirect('/');
    }
  } catch(error){
    console.error('User Login Failed', error);
    res.status(500).send('Internal Server Error');
  }

});

router.get('/profile', (req, res) => {
  
  const user = req.session.user;

  if(user){
    res.render('user-profile', {user});
    console.log('User logged in succesfully!');    
  } else{
    res.send('Please log in to view your profile.');
  }

});

router.get('/profile/update',async (req, res)=>{
  const user = req.session.user;

  try{
    if(user){
      res.render('user-update', { user });
    } else{
      res.redirect('/');
    }
  } catch(error){
    console.error('Error while getting user-update page', error);
  }
})



router.post('/profile/update', upload.single('profilePic'), async (req, res) => {
  try {
    const userId = req.session.user._id;
    const newName = req.body.newName;
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    if (!userId) {
      return res.send('Please log in to update your profile');
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.send('User not found');
    }

    user.name = newName;

    if (req.file) {
      user.profilePic.data = req.file.buffer;
      user.profilePic.contentType = req.file.mimetype;
    }

    user.status = false;

    await user.save();

    res.redirect('/profile');
  } catch (error) {
    console.error('Error updating user profile', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
