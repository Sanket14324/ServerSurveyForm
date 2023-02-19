const express = require("express");
const Response = require("../model/Response");
const router = require("./UserController");

const router2 = express.Router();

// Submit a response for a specific form
// You have to give form ID
//Take responses of specific form

router2.get('/form/responses/:id', async (req, res) => {

  try {

    const formId = req.params.id;
    const response = await Response.find({ formId });

    if (response) {
      res.status(200).send(response);
    }
    else {
      res.status.apply(201).send("No response exist");
    }
  }
  catch (error) {

    return null;
  }

})


router2.post("/forms/responses/:id", async (req, res) => {

  const response = await Response.findOne({ formId: req.params.id, email :  req.body.formData.email });
  
  if (response) {
    return res.status(401).send("Unauthorized user");
  }
  else {
    
    var questionArray = req.body.formData.questions;
    const responsesArray = questionArray.map((que) => {
      if (typeof (que.ans) === 'string') {
        return { "question": que.questionText, "answer": que.ans };
      }
      else {
        let answers = "";
        que.ans.forEach(element => {
          if (answers === "") {
            answers = answers + element
          }
          else {
            answers = answers + "," + element;
          }

        });

        return { "question": que.questionText, "answer": answers }
      }


    })
    const response = new Response({
      formId: req.params.id,
      email: req.body.formData.email,
      responses: responsesArray,
    });
    response.save((err, savedResponse) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send("Success");
    });
  }
});






module.exports = router2;

