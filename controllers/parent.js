const express = require('express')
const router = express.Router()
const Kid = require('../models/kid-model')
const Assignment = require('../models/assignment-model')
// const multer = require('multer')
// const upload = multer({dest: 'uploads/'})
// const store = require('../multer')




router.get('/', (req, res) => {
    res.send(`You've hit the home route!`)
})

router.get('/task', (req, res) => {
    Kid.find({})
    .populate('task')
    .then(kids => {
        console.log(kids)
        res.render('index', { kids })
    })

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

router.get('/task/new', (req, res) => {
    res.render('new')
})

router.post('/task', (req, res) => {
    console.log(req.body,'post')
    Assignment.create({homework:[], chores: [], schedule: []})
    .then(assignments => {
    Kid.create(
        {
            name: req.body.name,
            task: assignments._id
        }
    )
    .then(kids => {
        console.log(kids,'and then')
        res.redirect('/task')
    })

})


})
router.get('/task/:id/edit', (req, res) => {
    const routeID = req.params.id
    Kid.findById(routeID)
    .then(kids => {
        res.render('edit', { kids })
    })
})
router.put('/task/:id', (req, res) => {
    const routeId = req.params.id
    Assignment.findOneAndUpdate(
        { _id: routeId },
        {
            homework: req.body.homwework,
            chores: req.body.chores,
            schedule: req.body.schedule
        }, 
        { new: true }
    ).then(assignments => {
    Kid.findOneAndUpdate(
        { _id: routeId },
        { task: assignments._id}
    )
    .then(kids => {
        res.render('show', { kids })
    })
    .catch(console.error)

    })
})
   



module.exports = router