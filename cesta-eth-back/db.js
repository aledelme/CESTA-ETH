const { Pool } = require("pg")
 
const pool = new Pool({
    user: "postgres",
    password: "1234",
    database: "postgres",
    host: "localhost",
    port: 5432
})

async function query(sql, params){
    const result = await pool.query(sql, params)

    return result.rows
}


module.exports = query