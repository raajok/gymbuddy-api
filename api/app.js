require('dotenv').config();
var express = require('express');
var cors = require("cors");
var mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const PORT = process.env.PORT || 9000;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

var app = express();

app.use(cors());
app.use(express.json());

var testAPIRouter = require("./routes/testAPI");
var trainingRouter = require('./routes/training-routes');
var programsRouter = require('./routes/programs-routes');

// testing API connection
app.use("/testAPI", testAPIRouter);

// Router for training page
app.use('/api/', trainingRouter);

// Router for programs page
app.use('/api/programs', programsRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});