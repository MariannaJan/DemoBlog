export class Comment {
    constructor(
        public nick: string,
        public content: string,
        public postDate: Date,
        public replies: Array<Reply>= []
    ) {}
}

export class Reply {
    constructor(
        public nick: string,
        public content: string,
        public replyDate: Date,
    ) {}
}
