
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DetailThreadUseCase = require('../DetailThreadUseCase');

describe('DetailThreadUseCase', () => {
  it('should throw error if use case payload not contain threadId', async () => {
    // Arrange
    const useCasePayload = {};
    const detailThreadUseCase = new DetailThreadUseCase({});

    // Action & Assert
    await expect(detailThreadUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('DETAIL_THREAD_USE_CASE.NOT_CONTAIN_THREAD_ID');
  });

  it('should throw error if thread Id not string', async () => {
    // Arrange
    /* const useCasePayload = {
    threadId: 123,
    }; */
    const detailThreadUseCase = new DetailThreadUseCase({});

    // Action & Assert
    await expect(detailThreadUseCase.execute(123))
      .rejects
      .toThrowError('DETAIL_THREAD_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the detail thread action correctly', async () => {
    // Arrange
    /* const useCasePayload = {
      threadId: 'thread-123',
    }; */
    const mockThreadRepository = new ThreadRepository();
   
    mockThreadRepository.getThreadSpecById = jest.fn()
      .mockImplementation(() => Promise.resolve());
      
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const detailThreadUseCase = new DetailThreadUseCase({
      ThreadRepository: mockThreadRepository,
    });

    // Act
    await detailThreadUseCase.execute('thread-123');

    // Assert
    expect(mockThreadRepository.getThreadSpecById)
      .toHaveBeenCalledWith('thread-123');
    expect(mockThreadRepository.getThreadById)
      .toHaveBeenCalledWith('thread-123');
  });
});
