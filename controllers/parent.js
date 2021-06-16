const express = require('express')
const router = express.Router()
const Kid = require('../models/kid-model')
const Assignment = require('../models/assignment-model')

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
    .populate({path:'task', select: ['homework', 'clean']})
    .then(kids => res.json(kids))
})

module.exports = router 