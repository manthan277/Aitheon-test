const express = require('express');
const router = express.Router();
const User = require('../models/User');
const userValidate = require('../Validations/user');
const bcrypt = require('bcryptjs');

router.get("/", (req, res) =>{

    res.render("result", {
        user : undefined
    });
})

router.get("/quiz", (req, res) =>{
    const user = req.cookies.user;

    if(!user){
        res.redirect('/login');
        next();
    }

    res.render("quiz", {
        user : user
    });


})

router.get("/signup", (req, res) =>{
    res.render('signup', {
        user : undefined
    });
})

router.get("/login", (req, res) =>{
    res.render('login', {
        user : undefined
    });
})

router.post('/signup', (req, res) => {

      const {isValid, errors } = userValidate(req.body);  

      if(!isValid){
          return res.status(400).json({errors});
      }  

      const {email, password } = req.body;

      User.findOne({email : email}).then(user =>{
          if(user){
              errors.email = 'Email already exists';
              return res.status(400).json({errors});
          }

          const newUser = new User({
              email, 
              password
          })

          bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(password, salt, (err, hash) =>{
                    if (err)
                        throw err
                    newUser.password = hash
                    
                    newUser.save().then(user1 =>{
                        return res.json({user : user1});
                    })
                    .catch(err => console.log(err))
                })
          })  
          
      })
        .catch(err => console.log(err) )

})

router.post('/login', (req, res) =>{

    const {isValid, errors } = userValidate(req.body);  

      if(!isValid){
          return res.status(400).json({errors});
      }  

      const {email, password } = req.body;

      User.findOne({email : email}).then(user =>{
          if(!user){
              errors.email = 'User with Email not found';
              return res.status(400).json({errors});
          }

          bcrypt.compare(password, user.password).then(isMatch =>{
              if(!isMatch){
                errors.password = 'Incorrect Password';
                return res.status(400).json({errors});
              }
          })

          res.cookie('user', email, {httpOnly : true, maxAge : 24 * 3600000 });
          return res.json({user : user._id});  
      })
        .catch(err => console.log(err) ) 

})

router.get("/logout", (req, res) => {

    //const email = req.cookies.user;

    //console.log(email);

    res.clearCookie('user');
    return res.redirect('/login');
})

module.exports = router;