const ThreadRepositoryPostgres = require('../../Infrastructures/repository/ThreadRepositoryPostgres');
const pool = require('../../Infrastructures/database/postgres/pool');

class DeleteCommentUseCase {
  constructor({ threadRepository}) {
    this._threadRepository = threadRepository;  
    this._threadRepositoryPostgres= ThreadRepositoryPostgres;
    this._pool=pool;
  }

      async execute(owner,threadId,commentId) {

        this._verifyCommentOwner(commentId,owner)
        
        return  this._threadRepository.deleteCommentById(threadId,commentId);
        
      }

      _verifyCommentOwner(commentId,owner) {
     
        const query = {
          text: 
              ` SELECT distinct comments.id as commentId,owner 
                FROM comments 
                INNER JOIN users ON comments.owner=users.id  
                WHERE comments.id = $1 and owner=$2`,
          values: [commentId,owner]
        };
        const result = this._pool.query(query);
        if (!result) {      
          throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
        }
      
      }
    
}

module.exports = DeleteCommentUseCase;
