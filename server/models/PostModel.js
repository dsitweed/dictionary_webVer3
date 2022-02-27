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