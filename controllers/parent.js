const express = require('express')
const router = express.Router()
const Kid = require('../models/kid-model')
const Assignment = require('../models/assignment-model')
const { error } = require('console')

router.get('/', (req, res) => {
    Kid.find({})
    .populate('task')
    .then(kids => res.json(kids))
    .catch(error)
})

router.get('/:id', (req, res) =>{
    Kid.findById(req.params.id)
    .populate('task')
    .then(kids => res.json(kids))
})

module.exports = router 