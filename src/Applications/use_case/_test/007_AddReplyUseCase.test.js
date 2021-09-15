const AddedReply = require('../../../Domains/threads/entities/AddedReply');
const AddReplyUseCase = require('../AddReplyUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('AddReplyUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the add reply action correctly', async () => {
    // Arrange
        
    const owner ='user-123';
    const commentId ='comment-123';

    const useCasePayload = {
      id: 'reply-123',
      
      content: 'dicoding' 
    };
    
    const expectedAddedreply = new AddedReply({
      id: 'reply-123',
      content: useCasePayload.content,
     
    });

    /** creating dependency of use case */
    const mockthreadRepository = new ThreadRepository();
  /*   const mockthreadRepositoryPostgres = new ThreadRepositoryPostgres();

    mockthreadRepositoryPostgres.verifyCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve());
     */
    mockthreadRepository.addReply = jest.fn()
      .mockImplementation(() => Promise.resolve(owner,commentId,expectedAddedreply));

    /** creating use case instance */
    const getreplyUseCase = new AddReplyUseCase({
      threadRepository: mockthreadRepository  
    });
    
  
    // Action
    const addedreply= await getreplyUseCase.execute(owner,commentId,useCasePayload);

    // Assert
    expect(addedreply).toStrictEqual(owner,commentId,expectedAddedreply);
    expect(mockthreadRepository.addReply).toBeCalledWith(owner,commentId,{
      id:'reply-123',
      content: useCasePayload.content,
      owner:'user-123' 
     
    });
  });
});
