const { createPool } = require('mysql');
const pool = createPool({
    //  port: "3306",
    host: "localhost",
    user: "root",
    password: "030589",
    database: "crudnodjsAPI",
    connectionLimits: 10
});
module.exports = pool;