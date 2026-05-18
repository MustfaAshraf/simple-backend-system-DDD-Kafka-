import PostEntity from '../../domain/post.entity.js';
import Post from './post.model.js'

class PostRepository {
    async save(postData) {
        const newPost = new Post({
            title: postData.title,
            content: postData.content
        })

        const savePost = await newPost.save()
        return new PostEntity({
            id: savePost._id.toString(),
            title: savePost.title,
            content: savePost.content,
            createdAt: savePost.createdAt
        });
    }

    async getAll() {
        const posts = await Post.find();

        return posts.map(post => new PostEntity({
            id: post._id.toString(),
            title: post.title,
            content: post.content,
            createdAt: post.createdAt
        }))
    }

    async getById(id) {
        const post = await Post.findById(id);

        if(!post){
            return null
        }

        return new PostEntity({
            id: post._id.toString(),
            title: post.title,
            content: post.content,
            createdAt: post.createdAt
        })
    }
}

export default PostRepository