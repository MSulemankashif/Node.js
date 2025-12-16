let mongoose = require('mongoose');

async function connectDB() {
    try{
        let conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to ${conn.connection.host}`);
    }catch(error){
        console.log(error);
        return;
    }
}
module.exports = connectDB;