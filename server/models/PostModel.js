import mongoose from "mongoose";

const schema = new mongoose.Schema({
    cachViet: {
        type: String,
        required: true
    },
    nguNghia: {
        type: String,
        required: true
    },
    phienAm: {
        type: String,
        required: true,
        default: 'Anonymous'
    },
    attachment: String,
}, {timestamps: true});
                                    //name of table  //schema is model detail        
export const PostModel = mongoose.model('Post', schema);

const resultTable = new mongoose.Schema({
    score: Number,
    maxScore: Number
}, {timestamps: true});

export const SaveExam = mongoose.model("Result", resultTable);