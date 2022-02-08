module.exports = {
    SWAGGER_OPTIONS: {
        swaggerDefinition: {
            info: {
                description: 'This is the documentation for the REST API',
                servers: [
                    {
                        url: 'http://localhost:8080',
                        description: 'The development API server',
                        variables: {
                            basePath: {
                                default: 'api',
                            },
                        },
                    },
                ],
                title: 'REST API',
                version: '3.1.0',
            },
        },
        apis: ['./routes/**/*.js', './services/**/*.js', './models/**/*.js']
    },
};
