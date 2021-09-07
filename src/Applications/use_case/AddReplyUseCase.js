const AddedReply = require('../../Domains/threads/entities/AddedReply');

class AddedReplyUseCase {
  constructor({ threadRepository}) {
    this._threadRepository = threadRepository;  
  }

  async execute(owner,commentId,useCasePayload) {
    
    const newReply = new AddedReply(useCasePayload);

    await this._threadRepository.verifyCommentOwner(commentId,owner)
    
    return this._threadRepository.addReply(owner,commentId,newReply);

  }
    
}

module.exports = AddedReplyUseCase;
