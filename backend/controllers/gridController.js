const asyncHandler = require('express-async-handler')
const {NewData} = require('../csvReader')


const getGridData = asyncHandler(async (req, res) => {
      let newdata = await NewData.find()
      console.log("Endpoint Hit")
      res.status(200).send(newdata);
})

const setGridData = asyncHandler(async (req, res) => {
      console.log(req.body.text);
      res.status(200).send('Testing Post');
})

module.exports = {
      getGridData,
      setGridData
}