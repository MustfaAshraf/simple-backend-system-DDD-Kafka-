class PostEntity {
    constructor({id, title, content, createdAt}){
        this.id = id || null;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt || new Date();

        this.validate();
    }

    validate(){
        if(!this.title || this.title.trim() === ''){
            throw new Error("Post Title can not be empty");
        }

        if(!this.content || this.content.trim() === ''){
            throw new Error("Post Content is required")
        }
    }

    JsonToSave(){
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            createdAt: this.createdAt
        }
    }
}

export default PostEntity