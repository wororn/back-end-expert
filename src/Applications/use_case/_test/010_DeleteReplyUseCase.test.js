const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const ThreadRepositoryPostgres = require('../../../Infrastructures/repository/ThreadRepositoryPostgres');
const DeleteReplyUseCase = require('../DeleteReplyUseCase');

describe('DeleteReplyUseCase', () => {
   /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the delete reply action correctly', async () => {
   
    const mockThreadRepository = new ThreadRepository();
   /* const mockthreadRepositoryPostgres = new ThreadRepositoryPostgres();
    
     mockthreadRepositoryPostgres.verifyReplyOwner = jest.fn()
      .mockImplementation(() => Promise.resolve()); */
     
    mockThreadRepository.deleteReplyById = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const deleteReplyUseCase = new DeleteReplyUseCase({
      threadRepository: mockThreadRepository,
    });

    // Act
    await deleteReplyUseCase.execute('user-123','thread-123','comment-123','reply-123');

    // Assert
    /* expect(mockthreadRepositoryPostgres.verifyReplyOwner)
      .toHaveBeenCalledWith('reply-123','user-123'); */
    expect(mockThreadRepository.deleteReplyById)
      .toHaveBeenCalledWith('thread-123','comment-123','reply-123');
  });

  

});
