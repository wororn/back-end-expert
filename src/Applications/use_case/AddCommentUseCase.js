const AddedComment = require('../../Domains/threads/entities/AddedComment');

class AddedCommentUseCase {
  constructor({ threadRepository}) {
    this._threadRepository = threadRepository;
   
  }

  async execute(owner,threadId,useCasePayload) {
    
    const newComment= new AddedComment(useCasePayload);
    
    await this._threadRepository.verifyThreadOwner(threadId,owner)
   
    return this._threadRepository.addComment(owner,threadId,newComment);

  }

}

module.exports = AddedCommentUseCase;
