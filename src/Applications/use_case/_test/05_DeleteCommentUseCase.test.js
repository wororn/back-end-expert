const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should throw error if use case payload not contain commentId', async () => {
    // Arrange
    const useCasePayload = {};
    const deleteCommentUseCase = new DeleteCommentUseCase({});

    // Action & Assert
    await expect(deleteCommentUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('DELETE_COMMENT_USE_CASE.NOT_CONTAIN_COMMENT_ID');
  });

  it('should throw error if comment Id not string', async () => {
    // Arrange
    /* const useCasePayload = {
      commentId: 123
    }; */
    const deleteCommentUseCase = new DeleteCommentUseCase({});

    // Action & Assert
    await expect(deleteCommentUseCase.execute(123))
      .rejects
      .toThrowError('DELETE_COMMENT_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    /* const useCasePayload = {
      commentId: 'comment-123',
    }; */
    const mockThreadRepository = new ThreadRepository();
    
    mockThreadRepository.verifyCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve());

    mockThreadRepository.deleteCommentById = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Act
    await deleteCommentUseCase.execute('thread-123','comment-123');

    // Assert
    expect(mockThreadRepository.verifyCommentOwner)
      .toHaveBeenCalledWith('comment-123','user-123');
    expect(mockThreadRepository.deleteCommentById)
      .toHaveBeenCalledWith('thread-123','comment-123');
  });
});
