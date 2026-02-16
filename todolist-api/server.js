const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 3000;
// i got a problem reading the config from .env file so i put the mongo uri here
MONGO_URI= 'mongodb+srv://abederrahmenbenharb_db_user:Hawfibeli12369874**@cluster0.g02dt9m.mongodb.net/';
console.log('port: ', PORT);
console.log('uri: ', MONGO_URI);

(async () => {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}) ();