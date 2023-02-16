const express = require("express");
const Response = require("../model/Response");
const router = express.Router();
const CSVParser = require('json2csv').Parser;

//Exporting all responses
router.get('/responses/:id', async (req, res) => {
    try {
        const data = [
        ];
        const temp = [];
        const emailArray = [];
        temp.push('email');
        temp.push('timestamp')
        const timeArray =[]
        const responsesLocal = await Response.find({ formId: req.params.id })
        
        let i = 0;
        //Inserting Column        
        responsesLocal.forEach(response => {
            if (i < 1) {
                response.responses.forEach(resp => {
                    emailArray.push(response.email);
                    timeArray.push(response.createdAt);
                    temp.push(resp.question);
                });
            }else{
                response.responses.forEach(resp => {
                    emailArray.push(response.email);
                    timeArray.push(response.createdAt)
                });
            }
            i = i + 1;
        });
        data.push(temp);
        
        //Inserting Data        
        let j = 0;
        responsesLocal.forEach(response => {
            const arr = [];
            arr.push(emailArray[j]);
            arr.push(timeArray[j])
            
            response.responses.forEach(resp => {
                arr.push(resp.answer);
                j = j + 1;
            });
            data.push(arr);
        });
        //To Convert json into csv format         
        // const csvFields = ['name', 'question', 'answer'];        
        const csvParser = new CSVParser({ temp });
        const csvData = csvParser.parse(data);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attatchment: filename=responseData.csv");
        res.status(200).end(csvData);
    }
    catch (err) {
        if (err) throw err;
        res.send({ status: 400, meassage: err.meassage })
    }
})


module.exports = router;