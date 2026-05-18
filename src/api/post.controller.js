import PostRepository from "../infrastructure/db/post.repository.js";
import KafkaPostProducer from "../infrastructure/kafka/kafka.producer.js";
import PostUseCase from "../application/postUseCase.js";

const repository = new PostRepository()
const producer = new KafkaPostProducer()
const postUseCase = new PostUseCase(repository, producer)

export const createNewPost = async (req, res) => {
    try {
        const {title , content} = req.body;

        const post = await postUseCase.create(title, content);

        res.status(201).json(post);
    } catch (error) {
        res.status(500).send(`Error creating post: ${error.message}`)
    }
}

export const getAllPosts = async (req,res) => {
    try {
        const posts = await postUseCase.getAll();

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).send(`Error getting posts: ${error.message}`);
    }
}

export const getSinglePost = async (req,res) => {
    try {
        const post = await postUseCase.getOne(req.params.id)

        res.status(200).json(post);
    } catch (error) {
        res.status(500).send(`Error retrieving Post: ${error.message}`);
    }
}