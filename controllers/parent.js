const express = require('express')
const router = express.Router()
const Kid = require('../models/kid-model')
const Assignment = require('../models/assignment-model')
const User = require('../models/user-model')
const multer = require('multer')
const upload = require('../multer')
const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local')
const bcrypt = require('bcrypt')

// passport.serializeUser((user, done) => {
//     done(null, user.id)
// })

// passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//         done(err, user)
//     })
// })

// passport.use(new localStrategy((username, password, done) => {
//     User.findOne({ username: username }, (err,user) => {
//         if (err) return done(err)
//         if (!user) return done (null, false, { message: 'Incorrect Username.'})

//         bcrypt.compare(password, user.password, (err, res) => {
//             if (err) return done(err)
//             if(res === false) return done(null, false, { message: 'Incorrect password.'})

//             return done(null, user)
//         })
//     })
// }))

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) return next()
//     res.redirect('/login')
// }

router.get('/',(req, res) => {
    res.send(`You've hit the home route`)
})

// router.get('/login', (req, res) => {
//     res.render('login')
// })

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/task',
//     failureRedirect:'/login?error=true'
// }))

// router.get('/login/setup', async (req, res) =>{
//     const exists = await User.exists({ username: "admin"})

//     if (exists) {
//         console.log("Exists")
//         res.redirect('/task')
//         return
//     }

//     bcrypt.genSalt(10, (err, salt) =>{
//         if(err) return next(err)
//         bcrypt.hash('pass', salt, (err, hash) => {
//             if(err) return next(err)

//             const newAdmin = new User({
//                 username: "admin",
//                 password: hash
//             })
//             newAdmin.save()
//             res.redirect('/task')
//         })
//     })
// })

router.get('/task', (req, res) => {
    Kid.find({})
    .populate('task')
    .then(kids => {
        console.log(kids)
        res.render('index', { kids })
    })
})

router.get('/task/new', (req, res) => {
    res.render('new')
})

router.get('/task/:id', (req, res) =>{
    const routeID = req.params.id
     Kid.findById(routeID)
     .populate('task')
     .then(kids => {
         console.log(kids)
         res.render('show', { kids })
     })
})

router.post('/task', upload.single('img'),(req, res) => {
    Assignment.create({homework:[], chores: [], schedule: []})
    .then(assignments => {
    Kid.create(
        {
            name: req.body.name,
            img: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            
            },
            task: assignments._id
        }
    )
    .then(kids => {
        console.log(kids)
        res.redirect('/task')
    })

    })
})

router.get("/task/:id/img", async (req, res, next) => {
    try {
      const kid = await Kid.findById(req.params.id).populate('task');
      res.set("Content-Type", kid.img.contentType);
      res.send(kid.img.data);
    } catch (err) {
      next(err);
    }
  });

router.get('/task/:id/edit', (req, res) => {
    const routeID = req.params.id
    Kid.findById(routeID)
    .populate('task')
    .then(kids => {
        console.log(kids)
        res.render('edit', { kids })
    })
})

router.put('/task/:id', (req, res) => {
    const routeId = req.params.id
     Kid.findOneAndUpdate(
        { _id: routeId },
        {
            name: req.body.name,
        },
        { new: true }
    )
    .then(kid => {
        Assignment.findOneAndUpdate(
        { _id: kid.task},
        {
            homework: req.body.homework,
            clean: req.body.clean,
            schedule: req.body.schedule
        }, 
        { new: true }
    ).then(assignment => { 
        res.render('show', {kids: { name: kid.name, _id: kid._id,  task: assignment }}) })  
    })
    .catch(console.error)
})

router.get('/task/:id/edit/image',upload.single('img'), (req, res) => {
    const routeID = req.params.id
    Kid.findById(routeID)
    .populate('task')
    .then(kids => {
        console.log(kids)
        res.render('update', { kids })
    })
})

router.put('/task/:id/image',upload.single('img'), (req, res) => {
    const routeId = req.params.id
    Kid.findOneAndUpdate(
           
            { _id: routeId },
            {
                img: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype, 
                   
                }
            },
          
            { new: true }
        )
        .then(kid => {
            Assignment.findOneAndUpdate(
            { _id: kid.task},
          
            { new: true }
        ).then(assignment => { 
            res.render('show', {kids: { name: kid.name, img: kid.img.data, _id: kid._id,  task: assignment }}) })  
        })
        .catch(console.error)
})

router.delete('/task/:id', (req, res) => {
    const id = req.params.id
    Kid.findOneAndRemove(
        { _id: id }
    )
    .then(kids => {
        res.redirect('/task')
    })
    .catch(console.error)
})

module.exports = router