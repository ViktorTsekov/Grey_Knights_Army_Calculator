require('dotenv').config()

const wargearValuesViewHelper = require('./helpers/wargearValuesView')
const statusCodes = require('serverStatusCodes')

module.exports = (app) => {
  app.get(`${process.env.NODE_ENV === 'development' ? '/api' : ''}/wargearValues`, (req, res) => {
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

  app.patch(`${process.env.NODE_ENV === 'development' ? '/api' : ''}/wargearValues/:id`, async (req, res) => {
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
