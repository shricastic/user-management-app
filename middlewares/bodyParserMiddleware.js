const bodyParser = require('body-parser');

const bodyParserMiddleware = bodyParser.urlencoded({
    extended: true
});

module.exports = bodyParserMiddleware;