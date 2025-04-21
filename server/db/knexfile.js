// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : 'root',
      database : 'grey_knights_army_calculator'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : 'root',
      database : 'grey_knights_army_calculator'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host : 'db-mysql-nyc1-96665-do-user-18178818-0.j.db.ondigitalocean.com',
      port : 25060,
      user : process.env.PRODUCTION_DATABASE_USER,
      password : process.env.PRODUCTION_DATABASE_PASSWORD,
      database : 'defaultdb'
    }
  },

};
