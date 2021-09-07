const DetailThread = require('../../Domains/threads/entities/DetailThread');

class DetailThreadUseCase {
    constructor({threadRepository}) {
      this._threadRepository = threadRepository;     
    }
  
    async execute(useCasePayload) {

      const { threadId } = new DetailThread(useCasePayload);
       
        await this._threadRepository.getThreadSpecById(threadId);
      
        return this._threadRepository.getThreadById(threadId); 
       
    }
  
  }
  
  module.exports = DetailThreadUseCase;
  