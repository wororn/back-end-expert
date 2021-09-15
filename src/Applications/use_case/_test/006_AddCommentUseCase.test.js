const AddedComment = require('../../../Domains/threads/entities/AddedComment');
const AddCommentUseCase = require('../AddCommentUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('AddCommentUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the add comment action correctly', async () => {
    // Arrange
     
    const owner ='user-123';
    const threadId ='thread-123';

    const useCasePayload = {
      id: 'comment-123',
      content: 'dicoding' 
    };

    const expectedAddedcomment = new AddedComment({
      id: 'comment-123',
      content: useCasePayload.content,
    
    });

    /** creating dependency of use case */
    const mockthreadRepository = new ThreadRepository();
 
    mockthreadRepository.addComment = jest.fn()
      .mockImplementation(() => Promise.resolve(owner,threadId,useCasePayload));

    /** creating use case instance */
    const getcommentUseCase = new AddCommentUseCase({
      threadRepository: mockthreadRepository   
    });
    
    // Action
    const addedcomment= await getcommentUseCase.execute(owner,threadId,useCasePayload);

    // Assert
    expect(addedcomment).toStrictEqual(owner,threadId,expectedAddedcomment);
    expect(mockthreadRepository.addComment).toBeCalledWith(owner,threadId,{
      id: 'comment-123',
      content: useCasePayload.content, 
      owner:'user-123' 
     
    });
  });
});
