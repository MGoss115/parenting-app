const seedData = require('./kids-seeds.json')
const Kids = require('../models/kids-model')

Kids.deleteMany({})
    .then(() => {
        return Kids.insertMany(seedData)
    })
    .then(console.log)
    .catch(console.error)
    .finally(() => {
        process.exit()
    })