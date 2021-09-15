class AddedReply {
    constructor(payload) {
      this._verifyPayload(payload);
     
      const { 
        id = 'reply-123',
        content ='dicoding',
        owner = 'user-123'
        
      } = payload;
      
      this.id=id;
      this.content = content;
      this.owner = owner;
    
    }

    _verifyPayload({content}) {
    
      if (!content) {
        throw new Error('ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
      }

      if ( typeof content !== 'string') {
        throw new Error('ADDED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }

      if (content==' ' || content.length < 5) {
        throw new Error('ADDED_REPLY.CONTENT_LIMIT_CHAR');
      }
    }
  }
  
  module.exports = AddedReply;
  