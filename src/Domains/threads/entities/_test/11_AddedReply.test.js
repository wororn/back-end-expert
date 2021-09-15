const AddedReply= require('../AddedReply');

describe('a AddedReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      commentId: '*'   
    };

    // Action and Assert
    expect(() => new AddedReply(payload)).toThrowError('ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      content: {},
      owner : 'user-123' 
      
    };

    // Action and Assert
    expect(() => new AddedReply(payload)).toThrowError('ADDED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when content less than 5 character', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: '*',
      owner : 'user-123' 
    };

    // Action and Assert
    expect(() => new AddedReply(payload)).toThrowError('ADDED_REPLY.CONTENT_LIMIT_CHAR');
  });

  it('should create newReply object correctly', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      content: 'dicoding', 
      owner : 'user-123' 
    };

    // Action
    const addedReply= new AddedReply(payload);

    // Assert
    expect(addedReply.id).toEqual(payload.id);
    expect(addedReply.content).toEqual(payload.content);
    expect(addedReply.owner).toEqual(payload.owner);
  
  });
});
