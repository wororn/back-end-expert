class AddedThread {
    constructor(payload) {
       this._verifyPayload(payload);
      
      const {
        id ='thread-123',
        title ='Dicoding Indonesia',
        owner = 'user-123'
        
      } = payload;
    
      this.id = id;
      this.title = title;
      this.owner = owner;
  
    }

    _verifyPayload({title}) {
 
      if (!title) {
        throw new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if ( typeof title !== 'string') {
        throw new Error('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }
    }
  }
  
  module.exports = AddedThread;
  