

const DEV = {
    app : {
        port : process.env.DEV_APP_PORT || 3052
    },
    db : {
        host     :  process.env.DEV_DB_HOST     || 'localhost',
        port     :  process.env.DEV_DB_PORT     || 27017,
        name     :  process.env.DEV_DB_NAME     || 'shopDEV',
        user     :  process.env.DEV_DB_USER     || 'admin',
        password :  process.env.DEV_DB_PASSWORD || 'password',
    }
}

const PRO = {
    app : {
        port : process.env.PRO_APP_PORT || 3000
    },
    db : {
        host :  process.env.PRO_DB_HOST || 'localhost',
        port :  process.env.PRO_DB_PORT || 27017,
        name :  process.env.PRO_DB_NAME || 'shopPRO',
    }
}
const connectOptions = {
    useNewUrlParser: true,
};

const config = { DEV, PRO }
const env = process.env.NODE_END || 'DEV'
const MONGO_URI = `mongodb://${config[env].db.host}:${config[env].db.port}/${config[env].db.name}`
module.exports = { MONGO_URI ,connectOptions}