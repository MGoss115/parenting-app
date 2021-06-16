const seedData = require('./kid-seeds.json')
const Kid = require('../models/kid-model')
const Assignment = require('../models/assignment-model')

Kid.deleteMany({})
  .then( () => {
      Assignment.deleteMany({})
})
.then(() => {
    return Assignment.create({homework: 'math assignment', clean: 'bathroom', schedule: 'none'})
    })
    .then( (assignment) => {
        return seedData.map( (kid) => {
            return ({...kid, task: assignment._id})
    })
    })
  
    .then( (kids) => {
        return Kid.insertMany(kids)
    })
    .then(console.log)
    .catch(console.error)
    .finally(() => {
    process.exit();
  });




