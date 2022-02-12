const config = require("./db")
const sql = require('mssql')

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('MSSQL bog\'landi !...')
        return pool
    })
    .catch(err => console.log('Data Base ulanish uzildi ......: ', err))

module.exports = {
    sql,
    poolPromise
}