const { createLogger, transports, format } = require('winston');
require('winston-mongodb');

const logger = createLogger({
    transports: [
        //transports to show logs on console
        new transports.Console({
            level: 'info',
            format: format.combine(format.timestamp(), format.json(),
                format.prettyPrint(), format.colorize({ all: true })
            ),
        }),
        //transports to persist logs into mongo db collection
        new transports.MongoDB({
            level: 'error',
            db: 'mongodb+srv://kh4rzpt:kh4rzpt@cluster0.iddca.mongodb.net/test_db?retryWrites=true&w=majority',
            collection: 'logs',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = logger;