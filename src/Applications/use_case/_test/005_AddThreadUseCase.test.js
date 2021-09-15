const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const AddThreadUseCase = require('../AddThreadUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('AddThreadUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const owner ='user-123';
    const useCasePayload = {
      id: 'thread-123',
      title: 'Dicoding Indonesia',
    };

    const expectedAddedthread = new AddedThread({
      id: 'thread-123',
      title: useCasePayload.title, 
    });

    /** creating dependency of use case */
    const mockthreadRepository = new ThreadRepository();
    
    mockthreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(owner,expectedAddedthread));

    /** creating use case instance */
    const getthreadUseCase = new AddThreadUseCase({
      threadRepository: mockthreadRepository   
    });

    // Action
    const addedthread = await getthreadUseCase.execute(owner,useCasePayload);

    // Assert
    expect(addedthread).toStrictEqual(owner,expectedAddedthread);
    expect(mockthreadRepository.addThread).toBeCalledWith(owner,{
      id: 'thread-123',
      title: 'Dicoding Indonesia',
    
    });
  });
});
