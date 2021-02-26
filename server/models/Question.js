const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question : {
        type : String,
        required : true
   },
    correct_answer : {
        type : String,
        required : true
    },
    incorrect_answer : {
        type : [String],
        required : true
    }
})

const Question = mongoose.model('auestions', questionSchema);

module.exports = Question;