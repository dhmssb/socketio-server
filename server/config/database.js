const mongoose = require ('mongoose')
const mongoDB = 'mongodb+srv://dhms:123qwe4r@cluster0.edcby.mongodb.net/chatdb?retryWrites=true&w=majority'

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