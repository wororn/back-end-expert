const ThreadRepositoryPostgres = require('../../Infrastructures/repository/ThreadRepositoryPostgres');

class DetailThreadUseCase {
    constructor({threadRepository}) {
      this._threadRepository = threadRepository;     
      this._threadRepositoryPostgres= ThreadRepositoryPostgres;
    }
  
    async execute(threadId) {
     
        await this._threadRepository.getThreadById(threadId);
       
    }
  
  }
  
  module.exports = DetailThreadUseCase;
  