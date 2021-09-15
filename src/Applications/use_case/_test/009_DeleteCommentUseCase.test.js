const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const ThreadRepositoryPostgres = require('../../../Infrastructures/repository/ThreadRepositoryPostgres');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  
  it('should orchestrating the delete comment action correctly', async () => {
   
    const mockThreadRepository = new ThreadRepository();
   /* const mockthreadRepositoryPostgres = new ThreadRepositoryPostgres();

    mockthreadRepositoryPostgres.verifyCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve()); */

    mockThreadRepository.deleteCommentById = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Act
    await deleteCommentUseCase.execute('user-123','thread-123','comment-123');

    // Assert
    /* expect(mockthreadRepositoryPostgres.verifyCommentOwner)
      .toHaveBeenCalledWith('comment-123','user-123'); */
    expect(mockThreadRepository.deleteCommentById)
      .toHaveBeenCalledWith('thread-123','comment-123');
  });
});
