import express from 'express';
import { getPosts, createPost, updatePost, 
    deletePost, upResultExam, getResultExam } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);

router.post('/', createPost);

router.post('/update', updatePost);

router.post('/delete', deletePost);

router.post('/up-result-exam', upResultExam);

router.get('/get-results', getResultExam);

export default router;