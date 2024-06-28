const mongoose = require('mongoose');

// const URI = 'mongodb://localhost:27017/adminmern'
// mongoose.connect(URI);

const URI = process.env.MONGODB_URI

const connectDb = async() =>{
    try {
        await mongoose.connect(URI
        //     ,{
        //     useNewUrlParser:true,
        //     useUnifiedTopology:true,
        //     useCreateIndex:true,
        //     useFindAndModify:false
        // }
    )
        console.log('DB connected');
    } catch (error) {
        console.log(error);
        process.exit(0)
    }
}

module.exports = connectDb;