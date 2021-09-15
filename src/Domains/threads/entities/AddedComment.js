class AddedComment {
    constructor(payload) {

      this._verifyPayload(payload);
     
      const { 
        id='comment-123',
        content='dicoding',
        owner = 'user-123'
        
      } = payload;

      this.id=id;
      this.content = content;
      this.owner = owner;
     
    }

    _verifyPayload({ content }) {

      if (!content) {
        throw new Error('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
      }

      if ( typeof content !== 'string') {
        throw new Error('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }
         
      if ( content==' ' || content.length < 5 ) {    
        throw new Error('ADDED_COMMENT.CONTENT_LIMIT_CHAR'); 
      }
    }   
  }
  
  module.exports = AddedComment;
  