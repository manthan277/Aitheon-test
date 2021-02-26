const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : User
    },
    question : {
        type : Schema.Types.ObjectId,
        ref : Question
    },
    answer : {
        type : String,
        required : true
    }
})

const Answer = mongoose.model('answers', answerSchema);

module.exports = Answer;