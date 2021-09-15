const pool = require('../../Infrastructures/database/postgres/pool');

class ThreadRepository {
  constructor(){
  this._pool = pool;
  }
    async addThread(owner,AddedThread) {
      throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }

    async addComment(owner,threadId,AddedComment) {
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }

    async addReply(owner,commentId,AddedReply) {
        throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }
      
    async getThreadById(threadId) {
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }

    async getCommentById(commentId) {
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }

    async getReplyById(replyId) {
        throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }

    async getThreadSpecById(threadId) {
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }

    async getCommentSpecById(commentId) {
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }

    async getReplySpecById(commentId) {
        throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }
      
    async deleteCommentById(threadId,commentId) {
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }

    async deleteReplyById(threadId,commentId,replyId) {
        throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }   
}

module.exports = ThreadRepository;
  