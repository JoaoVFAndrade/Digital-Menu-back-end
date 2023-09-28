const mysql = require('mysql2/promise');


const cert = __dirname + '/DigiCertGlobalRootCA.crt.pem';

const dbConfig = {
    host: "senacp.mysql.database.azure.com",
    user: "senacsppi",
    password: "Vonneumann@",
    port: 3306,
    database: "digitalmenu",
    ssl: {
        rejectUnauthorized: false,
    },
    authSwitchHandler: (data, cb) => {
        if (data.pluginName === 'mysql_clear_password') {
            const password = 'Vonneumann@';
            const encrypted = Buffer.from(password + '\0');
            cb(null, encrypted);
        }
    }
};

const createConnection = async () => {
    return await mysql.createConnection(dbConfig);
};

module.exports = {
    createConnection,
};
