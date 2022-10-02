const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'ec2-52-200-68-5.compute-1.amazonaws.com',
    port: 5432,
    user: 'xsxulfvzyjcqpw',
    password: 'e4bdabaa53abe38542ad032d301898e5e1a6ff5d3464feadb8f6fa71b391e81e',
    database: 'd88v2l00vkph73',
    ssl: {
      rejectUnauthorized: false
    }
  }
});

module.exports = knex