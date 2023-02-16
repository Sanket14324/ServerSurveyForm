const mongoose = require("mongoose");
const express = require("express");
const ObjectId = express.ObjectId;
const mongoosePaginate = require("mongoose-paginate-v2");


var ResponseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
  email : {type:String},
  responses: 
    {
      type:Array
    },
},{ timestamps: true }
);

ResponseSchema.plugin(mongoosePaginate);
const Response = mongoose.model("Response", ResponseSchema, "Response");

module.exports = Response;
