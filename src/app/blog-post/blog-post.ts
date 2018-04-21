import { Comment } from '../post-comment/comment';

export class BlogPost {
    constructor(
        public title: string,
        public date: Date,
        public content: string,
        public comments: Array<Comment>= []) {}
}

