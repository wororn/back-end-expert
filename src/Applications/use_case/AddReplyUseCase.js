const AddedReply = require('../../Domains/threads/entities/AddedReply');
const ThreadRepositoryPostgres = require('../../Infrastructures/repository/ThreadRepositoryPostgres');

class AddedReplyUseCase {
  constructor({ threadRepository}) {
    this._threadRepository = threadRepository;  
 
  }

  async execute(owner,commentId,useCasePayload) {

    // this._threadRepositoryPostgres= ThreadRepositoryPostgres;
 
    const addedReply = new AddedReply(useCasePayload);

    // await ThreadRepositoryPostgres.verifyCommentOwner(commentId,owner)
    return this._threadRepository.addReply(owner,commentId,addedReply);

  }
    
}

module.exports = AddedReplyUseCase;
