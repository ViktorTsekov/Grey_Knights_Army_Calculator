const armyValuesViewHelper = require('./helpers/armyValuesView')
const statusCodes = require('../client/src/static_files/statusCodes')

module.exports = (app) => {
  app.get('/armyValues', (req, res) => {
    try {
      armyValuesViewHelper
        .retrieveAllArmyValues()
        .then((data) => {
          return res.status(200).json(data)
        })
    } catch(e) {
      console.error(e)
    }
  })

  app.patch('/armyValues/:id', async (req, res) => {
    try {
      const result = await armyValuesViewHelper.updateArmyValueById(req.params['id'], req.body.value)

      if(result === 1) {
        res.status(200).json({message: statusCodes.armyValuesUpdated})
      }
    } catch(e) {
      console.error(e)
    }
  })
}
