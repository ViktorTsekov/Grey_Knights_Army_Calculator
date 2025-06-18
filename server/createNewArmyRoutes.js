require('dotenv').config()

const createArmyHelper = require('./helpers/createArmyView')
const statusCodes = require('./serverStatusCodes.js')

module.exports = (app) => {
  app.post(`${process.env.NODE_ENV === 'development' ? '/api' : ''}/update-army`, (req, res) => {
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

  app.post(`${process.env.NODE_ENV === 'development' ? '/api' : ''}/create-army`, (req, res) => {
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
