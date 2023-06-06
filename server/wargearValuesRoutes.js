const wargearValuesViewHelper = require('./helpers/wargearValuesView')
const statusCodes = require('../client/src/static_files/statusCodes')

module.exports = (app) => {
  app.get('/wargearValues', (req, res) => {
    try {
      wargearValuesViewHelper
        .retrieveAllWargearValues()
        .then((data) => {
          return res.status(200).json(data)
        })
    } catch(e) {
      console.error(e)
    }
  })

  app.patch('/wargearValues/:id', async (req, res) => {
    try {
      const result = await wargearValuesViewHelper.updateWargearValueById(req.params['id'], req.body.value)

      if(result === 1) {
        res.status(200).json({message: statusCodes.wargearValuesUpdated})
      }
    } catch(e) {
      console.error(e)
    }
  })
}
