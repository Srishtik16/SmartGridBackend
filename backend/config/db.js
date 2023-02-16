const mongoose = require('mongoose')

const connectDB = async () => {
      try {
            const conn = await mongoose.connect(process.env.MONGO_URL)

            console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);

            // const db = mongoose.connection

            // db.collection('datas').deleteMany({})
      }
      catch (error) {
            console.log(error);
            process.exit(1);
      }
}
// const db = mongoose.connection;

module.exports = {
      connectDB,
      // db,
}