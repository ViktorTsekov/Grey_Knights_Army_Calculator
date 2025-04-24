const statusCodes = require('../client/src/static_files/statusCodes')
const viewArmyHelper = require('./helpers/viewArmy')

module.exports = (app) => {
  app.delete('/api/delete-army', (req, res) => {
    try {
      viewArmyHelper
        .deleteArmyById(req.body.armyId)
        .then(() => {
          return res.status(200).json({status: statusCodes.removedSuccessfully})
        })    
    } catch(e) {
      console.error(e)
    }
  })

  app.get('/api/get-army', (req, res) => {
    try {
      viewArmyHelper
        .returnArmyById(req.query.armyId)
        .then((data) => {
          return res.status(200).json(data[0])
        })    
    } catch(e) {
      console.error(e)
    }
  })

  app.get('/api/get-armies', (req, res) => {
    try {
      viewArmyHelper
        .returnArmiesByUserId(req.query.userId)
        .then((data) => {
          return res.status(200).json(data)
        })    
    } catch(e) {
      console.error(e)
    }
  })
}
