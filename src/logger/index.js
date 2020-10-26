const pino = require('pino')({
    //allow debug log
    level: 'debug',
    prettyPrint: {
        levelFirst: true,
    }
});

module.exports = pino;

