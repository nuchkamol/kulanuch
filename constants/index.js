'use strict'

module.exports = {
    HOST: process.env.HOST || 'http://localhost',
    PORT: process.env.PORT || 3000,
    TIMEOUT: 20000,
    MONGODB_URL: process.env.MONGODB_URL,
    LOGPATH: process.env.LOGPATH,
    PATHFILES: process.env.PATHFILES,
    PATHEXCEL: process.env.PATHEXCEL,
}
