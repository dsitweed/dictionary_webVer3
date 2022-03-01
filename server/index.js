import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import posts from './routers/posts.js';

const app = express();
const PORT = process.env.port || 5000;

const URI = 'mongodb+srv://admin:vN79C7uvA5l0wuC7@cluster0.yglql.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors()); 

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conneted to DB');
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`);
        });
    }).catch(err => {
        console.log('err', err);
    }) 

app.use('/posts', posts);


