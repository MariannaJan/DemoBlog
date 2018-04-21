import { Component} from '@angular/core';
import { BlogPost } from './blog-post';
import { Comment, Reply } from '../post-comment/comment';
import { NgForm } from '@angular/forms';
import { postText, comment1Text, comment2Text, reply1 } from './data';

@Component({
    selector: 'blog-post',
    templateUrl: './blog-post.component.html',
    styleUrls: ['./blog-post.component.css']
})

export class BlogPostComponent {

    isInEditMode = false;
    isCommentInEditMode = false;
    isInReplyMode = false;
    editedComment = undefined;
    repliedComment = undefined;



    post = new BlogPost(
        'New Post',
        new Date(),
        postText,
        [
            new Comment('Alan', comment1Text, new Date()),
            new Comment('Olga', comment2Text, new Date(), [new Reply('John', reply1, new Date())]),
        ]
    );
    toggleEditMode(): void {
        this.isInEditMode = !this.isInEditMode;
    }

    toggleCommentEditMode(): void {
        this.isCommentInEditMode = !this.isCommentInEditMode;
    }

    toggleReplyMode(): void {
        this.isInReplyMode = !this.isInReplyMode;
    }

    onSumbmit(commentForm: NgForm): void {
        if (commentForm.value.nick !== '' && commentForm.value.commentText !== '') {
            const comment = new Comment(
                commentForm.value.nick,
                commentForm.value.commentText,
                new Date());
        this.post.comments.push(comment);
        }
      }

      onCommentEditSumbmit(commentEditForm: NgForm): void {
          const oldComment: Comment = this.post.comments[this.editedComment];
          oldComment.nick = commentEditForm.value.nick;
          oldComment.content = commentEditForm.value.commentText + ` Edited on: ${new Date().toDateString()}`;

      }

      editComment(info, idx): void {
            console.log(info);
            this.toggleCommentEditMode();
            this.editedComment = idx;
      }

      finishEditing(): void {
            const confirmEdit: boolean = confirm('Do you really want to exit editing mode? All unsent changes will be lost!');
            if (confirmEdit) {
                this.toggleCommentEditMode();
            }
      }

      deleteComment(info, idx): void {
        const confirmDelete: boolean = confirm('Do you really want to delete the post?');
        if (confirmDelete) {
            this.post.comments.splice(idx, 1);
        }
      }

      replyComment(comment, idx): void {
        this.repliedComment = idx;
        this.toggleReplyMode();
    }

    onReplySumbmit(replyForm): void {
        if (replyForm.value.nick !== '' && replyForm.value.replyText !== '') {
            const reply = new Reply(replyForm.value.nick, replyForm.value.replyText, new Date());
            this.post.comments[this.repliedComment].replies.push(reply);
            this.toggleReplyMode();
        }
    }

    finishReply(): void {
        const confirmReply: boolean = confirm('Do you want to quit without replying?');
        if (confirmReply) {
            this.toggleReplyMode();
        }
    }


}
