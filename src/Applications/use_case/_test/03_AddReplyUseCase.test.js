const AddedReply = require('../../../Domains/threads/entities/AddedReply');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddReplyUseCase = require('../AddReplyUseCase');

describe('AddReplyUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the add reply action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'dicoding' 
    };
    const expectedAddedreply = new AddedReply({
      content: useCasePayload.content,
    });

    /** creating dependency of use case */
    const mockthreadRepository = new ThreadRepository();

    mockthreadRepository.verifyCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve());
    
    mockthreadRepository.addreply = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedreply));

    /** creating use case instance */
    const getreplyUseCase = new AddReplyUseCase({
      threadRepository: mockthreadRepository  
    });
 
    // Action
    const addedreply= await getreplyUseCase.execute(useCasePayload.content);

    // Assert
    expect(addedreply).toStrictEqual(expectedAddedreply);
    expect(mockthreadRepository.verifyCommentOwner).toBeCalledWith('comment-123','user-123');
    expect(mockthreadRepository.addreply).toBeCalledWith(new AddReplyUseCase({
      content: useCasePayload.content    
    }));
  });
});
