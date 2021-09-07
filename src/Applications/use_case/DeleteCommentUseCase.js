class DeleteCommentUseCase {
  constructor({ threadRepository}) {
    this._threadRepository = threadRepository;  
  }

      async execute(owner,threadId,commentId) {
    
        await this._threadRepository.verifyCommentOwner(commentId,owner);
        await this._threadRepository.getThreadSpecById(threadId);
        await this._threadRepository.deleteCommentById(threadId,commentId);
        
      }
    
}

module.exports = DeleteCommentUseCase;
