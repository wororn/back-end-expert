const AddedThread = require('../../Domains/threads/entities/AddedThread');

class AddedThreadUseCase {
  constructor({threadRepository}) {
    this._threadRepository = threadRepository; 
  }

  async execute(owner,useCasePayload) {

    const newThread = new AddedThread(useCasePayload);
   
    await this._threadRepository.verifyUserOwner(owner);
    return this._threadRepository.addThread(owner,newThread);

  }

}

module.exports = AddedThreadUseCase;
