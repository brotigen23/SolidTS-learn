// logger.js
const morgan = require('morgan');

// json-server ожидает функцию (req, res, next)
// оборачиваем morgan('dev') и прокидываем дальше
module.exports = (req, res, next) => morgan('dev')(req, res, next);