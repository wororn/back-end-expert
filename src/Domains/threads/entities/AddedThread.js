class AddedThread {
    constructor(payload) {
      this._verifyPayload(payload);
      
      const { title,body } = payload;
    
      this.title = title;
      this.body = body;
     
    }

    _verifyPayload({body, title}) {
 
   if ( !body || !title) {
        throw new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if ( typeof body !== 'string' || typeof title !== 'string') {
        throw new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
      }
    }
  }
  
  module.exports = AddedThread;
  