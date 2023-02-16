const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware');
const {connectDB} = require('./config/db')
const convertCsvToJson = require('convert-csv-to-json')
const cors = require('cors')
const port = 5000 || process.env.PORT

connectDB()

const app = express()

app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/smartgrid', require('./routes/gridRoutes'))

let data = convertCsvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv('GridData.csv')
for(var i = 0; i < data.length; i++) {
      console.log(data[i]);
}

const generateSchema = require('generate-schema');

let jsonData = data

let MongooseSchema = generateSchema.mongoose(jsonData);
console.log(MongooseSchema)

// const generateSchema = require('generate-schema');
// let jsonData = req.body;
// let MongooseSchema = generateSchema.mongoose(jsonData);

// let mongoose = require('mongoose')
// let NewOrder = mongoose.model('Order', MongooseSchema)

// let newOrder = new NewOrder(req.body)

// newOrder.save()
//   .then(() => res.json('Order added!'))
//   .catch(err => res.status(400).json(`Error: ${err}`));

app.use(errorHandler)

app.listen(port, () => {
      console.log(`Server started at PORT: ${port}`);
})