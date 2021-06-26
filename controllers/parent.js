const express = require('express')
const router = express.Router()
const Kid = require('../models/kid-model')
const Assignment = require('../models/assignment-model')
const multer = require('multer')
// const upload = multer({dest: 'uploads/'})
// const upload = require('../multer')


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



router.post('/task', (req, res) => {
    Assignment.create({homework:[], chores: [], schedule: []})
    .then(assignments => {
    Kid.create(
        {
            name: req.body.name,
            task: assignments._id
        }
    )
    .then(kids => {
        console.log(kids)
        res.redirect('/task')
    })

})


})

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
    let k
     Kid.findOneAndUpdate(
        { _id: routeId },
        {
            name: req.body.name,
        }, 
        { new: true }
    )
    .then(kid => {
        k = kid
        // console.log(kid,1)
        Assignment.findOneAndUpdate(
        { _id: kid.task},
        {
            homework: req.body.homework,
            clean: req.body.clean,
            schedule: req.body.schedule
        }, 
        { new: true }
    ).then(assignment => { 
        let _kid = { ...kid,  task: assignment }
        console.log(kid)
        res.render('show', {kids: { name: kid.name, _id: kid._id,  task: assignment }}) })  
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