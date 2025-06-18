require('dotenv').config()

const usersViewHelper = require('./helpers/usersView')
const statusCodes = require('./serverStatusCodes.js')

module.exports = (app) => {
  app.get(`${process.env.NODE_ENV === 'development' ? '/api' : ''}/clients`, (req, res) => {
    try {
      usersViewHelper
        .retrieveAllUsers(req.query.name)
        .then((data) => {
          return res.status(200).json(data.filter(el => el.name !== 'admin'))
        })
    } catch(e) {
      console.error(e)
    }
  })

  app.patch(`${process.env.NODE_ENV === 'development' ? '/api' : ''}/clients/:id`, async (req, res) => {
    try {
      const result = await usersViewHelper.updateUsersRoleById(req.params['id'], req.body.role)
      
      if(result === 1) {
        return res.status(200).json({message: statusCodes.userUpdated})
      }
    } catch(e) {
      console.error(e)
    }
  })

  app.delete(`${process.env.NODE_ENV === 'development' ? '/api' : ''}/clients/:id`, async (req, res) => {
    try {
      const result = await usersViewHelper.deleteUserById(req.params['id'])
      
      if(result === 1) {
        return res.status(200).json({message: statusCodes.userDeleted})
      }
    } catch(e) {
      console.error(e)
    }
  })
}
