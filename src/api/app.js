import express from "express";
import * as postController from './post.controller.js';

const app = express();

app.use(express.json());

app.get('/posts', postController.getAllPosts);

app.get('/posts/:id', postController.getSinglePost);

app.post('/posts', postController.createNewPost);

export default app