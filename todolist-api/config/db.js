const mongoose = require('mongoose');

async function connectDB(uri) {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error', error);
        process.exit();
    }    
}
module.exports = { connectDB };