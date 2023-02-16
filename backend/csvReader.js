const generateSchema = require('generate-schema')
const convertCsvToJson = require('convert-csv-to-json')
const mongoose = require('mongoose')
// const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config()
// const {errorHandler} = require('./middleware/errorMiddleware');
const { connectDB } = require('./config/db')

connectDB()

let data = convertCsvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv('GridData.csv')

let MongooseSchema = generateSchema.mongoose(data[0]);
console.log(MongooseSchema)

let NewData = mongoose.model('data1', MongooseSchema)

// NewData.deleteMany({})
//     .then(() => console.log(`All data dropped`.blue))
//     .catch(err => console.log(`Error: ${err}`));

async function addData(parameter) {
    let newData = new NewData(parameter)

    newData.save()
        .then(() => console.log(`Data added! ${parameter.SerialNo}`.magenta.bold))
        .catch(err => console.log(`Error: ${err}`));
}

function addLoop() {
    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        let jsonData = data[i];
        addData(jsonData);
    }
}



NewData.deleteMany({})
    .then(() => {addLoop();
        // console.log(`All data dropped!`.blue);
    })
    .catch(err => console.log(`Error: ${err}`));




module.exports= {NewData}