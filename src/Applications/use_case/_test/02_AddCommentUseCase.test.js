const AddedComment = require('../../../Domains/threads/entities/AddedComment');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'dicoding' 
    };
    const expectedAddedcomment = new AddedComment({
      content: useCasePayload.content
    });

    /** creating dependency of use case */
    const mockthreadRepository = new ThreadRepository();

    mockthreadRepository.verifyThreadOwner = jest.fn()
      .mockImplementation(() => Promise.resolve());
    
    mockthreadRepository.addcomment = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedcomment));

    /** creating use case instance */
    const getcommentUseCase = new AddCommentUseCase({
      threadRepository: mockthreadRepository   
    });

    // Action
    const addedcomment= await getcommentUseCase.execute(useCasePayload.content);

    // Assert
    expect(addedcomment).toStrictEqual(expectedAddedcomment);
    expect(mocthreadRepository.verifyThreadOwner).toBeCalledWith('thread-123','user-123');
    expect(mockthreadRepository.addcomment).toBeCalledWith(new AddCommentUseCase({
      content: useCasePayload.content  
    }));
  });
});
