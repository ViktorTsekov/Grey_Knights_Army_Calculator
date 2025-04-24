const createArmyHelper = require('./helpers/createArmyView')
const statusCodes = require('../client/src/static_files/statusCodes')

module.exports = (app) => {
  app.post('/update-army', (req, res) => {
    try {
      createArmyHelper
        .updateExistingArmy(req.body.armyId, req.body.armyName, req.body.armyList)
        .then(() => {
          return res.status(200).json({status: statusCodes.updatedSuccessfully})
        })    
    } catch(e) {
      console.error(e)
    }
  })

  app.post('/create-army', (req, res) => {
    try {
      createArmyHelper
        .addNewArmyToDb(req.body)
        .then(() => {
          return res.status(200).json({status: statusCodes.savedSuccessfully})
        })    
    } catch(e) {
      console.error(e)
    }
  })
}
