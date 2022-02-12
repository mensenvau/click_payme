const config = {
    multipleStatements: true,
    server: "192.168.10.9",
    user: 'test_login',
    password: 'Q1w2e3r4',
    database: "new_test",
    port: 1433,
    requestTimeout: 500000,
    options: {
        encrypt: false,
        enableArithAbort: true
    },
    pool: {
        min: 10,
        idleTimeoutMillis: 30000
    }
}

module.exports = config