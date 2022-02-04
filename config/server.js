module.exports = {
    PORT: process.env.PORT,
    CORS_HEADERS: {
        optionsSuccessStatus: 200,
        origin: process.env.WHITELISTED_DOMAINS.split(' '),
    },
};