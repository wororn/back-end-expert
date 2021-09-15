const AddedComment = require('../../Domains/threads/entities/AddedComment');

class AddedCommentUseCase {
  constructor({ threadRepository}) {
    this._threadRepository = threadRepository;   
  }
  
  async execute(owner,threadId,useCasePayload) {
   
    const addedComment= new AddedComment(useCasePayload);
    
    return this._threadRepository.addComment(owner,threadId,addedComment);

  }

}

module.exports = AddedCommentUseCase;
