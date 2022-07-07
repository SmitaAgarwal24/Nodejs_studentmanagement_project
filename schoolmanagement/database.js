const { Pool } = require("pg");

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database:"schoolmanagement",
    password:"Smita6789#",
    port:5432,
});

module.exports = pool;

