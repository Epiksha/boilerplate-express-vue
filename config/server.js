module.exports = {
    PORT: process.env.PORT,
    CORS_HEADERS: {
        origin: process.env.WHITELISTED_DOMAINS.split(),
    },
};