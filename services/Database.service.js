const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');

class DatabaseService {
    constructor() {
        mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        this.db = mongoose.connection;

        this.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }
}

module.exports = new DatabaseService;