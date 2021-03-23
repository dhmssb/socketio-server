const mongoose = require ('mongoose')
const mongoDB = process.env.DATABASE

const mongodbConnection = mongoose.connect(
    mongoDB,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
    (err, conn) => {
      if (err) throw err;
      console.log('Database connected!');
    }
  )

  module.exports = mongodbConnection