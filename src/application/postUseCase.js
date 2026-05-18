class PostUseCase {
    constructor(postRepository, kafkaProducer) {
        this.postRepository = postRepository;
        this.kafkaProducer = kafkaProducer;
    }

    async create(title, content) {
        const postData = { title, content }

        const savePost = await this.postRepository.save(postData)

        this.kafkaProducer.sendPostCreateEvent(savePost.id)

        return savePost;
    }

    async getAll() {
        const posts = await this.postRepository.getAll();

        this.kafkaProducer.sendAllPostsEvent()

        return posts;
    }

    async getOne(id) {
        const post = await this.postRepository.getById(id);

        if (!post) {
            throw new Error(`Post with ID ${id} not found`);
        }

        this.kafkaProducer.sendSinglePostEvent(id)

        return post;
    }
}

export default PostUseCase