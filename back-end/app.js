const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const adminRouter = require('./routers/adminRouter');
const studentRouter = require('./routers/studentRouter');
const hostelRouter = require('./routers/hostelRouter');
const hostelOwnerRouter = require('./routers/hostelOwnerRouter');


//access the env file 
dotenv.config();

//parse request objects as json object
app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('Databse Connection successful'))
.catch(error => console.log(error))

app.use('/admin', adminRouter);
app.use('/student', studentRouter);
app.use('/hostel', hostelRouter);
app.use('/hostelOwner',hostelOwnerRouter);

app.listen(process.env.PORT, ()=> {
    console.log(`Listening to the port ${process.env.PORT}`);
})