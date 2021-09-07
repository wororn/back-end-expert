const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      body: 'dicoding',
      title: 'Dicoding Indonesia',
    };
    const expectedAddedthread = new AddedThread({
      title: useCasePayload.title,
      body: useCasePayload.body 
    });

    /** creating dependency of use case */
    const mockthreadRepository = new ThreadRepository();

    mockthreadRepository.verifyUserOwner = jest.fn()
      .mockImplementation(() => Promise.resolve());
       
    mockthreadRepository.addthread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedthread));

    /** creating use case instance */
    const getthreadUseCase = new AddThreadUseCase({
      threadRepository: mockthreadRepository   
    });

    // Action
    const addedthread = await getthreadUseCase.execute(useCasePayload);

    // Assert
    expect(addedthread).toStrictEqual(expectedAddedthread);
    expect(mockthreadRepository.verifyThreadOwner).toBeCalledWith('user-123');
    expect(mockthreadRepository.addthread).toBeCalledWith(new AddThreadUseCase({
      title: useCasePayload.title,
      body: useCasePayload.body 
    }));
  });
});
