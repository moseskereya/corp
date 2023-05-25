const mongoose = require('mongoose');
const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database is connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = ConnectDB