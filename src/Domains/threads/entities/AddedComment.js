class AddedComment {
    constructor(payload) {

      this._verifyPayload(payload);
     
      const { content } = payload;
  
      this.content = content;
 
    }

    _verifyPayload({ content }) {

      if ( typeof content !== 'string') {
        throw new Error('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
      }
         
      if (!content) {
        throw new Error('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
      }

      if ( content==' ' || content.length <= 0 ) {    
        throw new NotFoundError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY'); 
      }
    }   
  }
  
  module.exports = AddedComment;
  