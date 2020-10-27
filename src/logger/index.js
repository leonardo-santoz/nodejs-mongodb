const { createLogger, transports, format } = require('winston');
require('winston-mongodb');
const { ElasticsearchTransport } = require('winston-elasticsearch');

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
            options: { useUnifiedTopology: true },
            collection: 'logs',
            format: format.combine(format.timestamp(), format.json())
        }),
    ]
})
//tranport to elasticsearch
logger.add(new ElasticsearchTransport({
    // esTransportOpts,
    index: "logging",
    level: 'info',
    clientOpts: { node: 'http://localhost:9200', }
}))

module.exports = logger;