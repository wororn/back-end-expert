const AddedThread = require('../../Domains/threads/entities/AddedThread');

class AddedThreadUseCase {
  constructor({threadRepository}) {
    this._threadRepository = threadRepository; 
  }

  async execute(owner,useCasePayload) {

   
    const {id,title}  = new AddedThread(useCasePayload);
   
    
    return this._threadRepository.addThread(owner,{id,title} );

  }

}

module.exports = AddedThreadUseCase;
