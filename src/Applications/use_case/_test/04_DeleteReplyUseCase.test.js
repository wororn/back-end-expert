const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeleteReplyUseCase = require('../DeleteReplyUseCase');

describe('DeleteReplyUseCase', () => {
  it('should throw error if use case payload not contain replyId', async () => {
    // Arrange
    const useCasePayload = {};
    const deleteReplyUseCase = new DeleteReplyUseCase({});

    // Action & Assert
    await expect(deleteReplyUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('DELETE_REPLY_USE_CASE.NOT_CONTAIN_REPLY_ID');
  });

  it('should throw error if reply Id not string', async () => {
    // Arrange
   /*  const useCasePayload = {
      replyId: 123
    }; */
    
    const deleteReplyUseCase = new DeleteReplyUseCase({});

    // Action & Assert
    await expect(deleteReplyUseCase.execute(123))
      .rejects
      .toThrowError('DELETE_REPLY_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the delete reply action correctly', async () => {
    // Arrange
   /*  const useCasePayload = {
      replyId: 'reply-123'
    }; */
    
    const mockThreadRepository = new ThreadRepository();
  
    mockThreadRepository.verifyReplyOwner = jest.fn()
      .mockImplementation(() => Promise.resolve());
     
    mockThreadRepository.deleteReplyById = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const deleteReplyUseCase = new DeleteReplyUseCase({
      threadRepository: mockThreadRepository,
    });

    // Act
    await deleteReplyUseCase.execute('thread-123','comment-123','reply-123');

    // Assert
    expect(mockThreadRepository.verifyReplyOwner)
      .toHaveBeenCalledWith('reply-123','user-123');
    expect(mockThreadRepository.deleteReplyById)
      .toHaveBeenCalledWith('thread-123','comment-123','reply-123');
  });
});
