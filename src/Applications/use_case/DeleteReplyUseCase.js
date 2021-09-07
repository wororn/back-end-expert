const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const pool = require('../../Infrastructures/database/postgres/pool');

class DeleteReplyUseCase {
    constructor({threadRepository}) {
    this._threadRepository = threadRepository;
    }
  
    async execute(owner,threadId,commentId,replyId) {
     
      await this.verifyReplyOwner(replyId,owner);
      await this._threadRepository.getThreadSpecById(threadId);
      await this._threadRepository.getCommentSpecById(commentId);
      await this._threadRepository.deleteReplyById(threadId,commentId,replyId);
      
    }
   
      async verifyReplyOwner(replyId,owner) {
        this._pool = pool;
        const query = {
          text: 
              ` SELECT id as replyId,owner 
                FROM replies 
                INNER JOIN users ON replies.owner=users.id 
                WHERE id = $1 and owner=$2`,
          values: [replyId,owner]
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
          throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
        }
       
      }
  
  }
  
  module.exports = DeleteReplyUseCase;
  