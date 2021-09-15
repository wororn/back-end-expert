const ThreadRepositoryPostgres = require('../../Infrastructures/repository/ThreadRepositoryPostgres');
const pool = require('../../Infrastructures/database/postgres/pool');

class DeleteReplyUseCase {
    constructor({threadRepository}) {
    this._threadRepository = threadRepository;
    this._threadRepositoryPostgres= ThreadRepositoryPostgres;
    this._pool=pool; 
    }
  
    async execute(owner,threadId,commentId,replyId) {

      this._verifyReplyOwner(replyId,owner);
     
      return this._threadRepository.deleteReplyById(threadId,commentId,replyId);
      
    }

    _verifyReplyOwner(replyId,owner) {
     
      const query = {
        text: 
            ` SELECT distinct replies.id as replyId,owner 
              FROM replies 
              INNER JOIN users ON replies.owner=users.id 
              WHERE replies.id = $1 and owner=$2`,
        values: [replyId,owner]
      };
      const result = this._pool.query(query);
      if (!result) {
        throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
      }
     
    }   
   
  }
  
  module.exports = DeleteReplyUseCase;
  