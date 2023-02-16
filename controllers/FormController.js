const express = require("express");
const Form = require("../model/Form");
const Response = require("../model/Response")
const router1 = express.Router();

// Get all forms
router1.get("/forms", (req, res) => {
  Form.find({}, (err, forms) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(forms);
  });
});


// Get a specific form
router1.get("/getforms/:id", (req, res) => {
  Form.findById(req.params.id, (err, form) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(form);
  });
});


//delete form
router1.delete("/deleteform/:id", (req, res) => {
  var myquery = { _id: req.params.id };
      Form.deleteOne(myquery, (err, result) => {
        if (err){
          return res.status(500).send(err);
        }
        
      });

  var query = {formId : req.params.id};
  // deleting all responses according to responses
  Response.deleteMany(query, (err, result) => {
    if(err){
      return res.status(500).send(err);
    }

    return res.status(200).send("deleted");
  })


})

// Create a new form
router1.post("/forms/:id", (req, res) => {
  
  const form = new Form({
    userId:req.params.id,
    questions:req.body.structureData,
    title:req.body.title
  });
  form.save((err, savedForm) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(savedForm);
  });
});

module.exports = router1;
