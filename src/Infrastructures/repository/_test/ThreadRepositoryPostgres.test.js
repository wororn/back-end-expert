const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const AddedComment = require('../../../Domains/threads/entities/AddedComment');
const AddedReply = require('../../../Domains/threads/entities/AddedReply');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe(' threadRepositoryPostgres', () => {
  it('should be instance of ThreadRepository domain', () => {
    const threadRepositoryPostgres = new ThreadRepositoryPostgres({}, {}); // dummy dependency

    expect( threadRepositoryPostgres).toBeInstanceOf(ThreadRepository);
  });

  describe('behavior test', () => {
    afterEach(async () => {
      await ThreadsTableTestHelper.cleanTable();
    });

    afterAll(async () => {
      await pool.end();
    });

    describe('verifyAvailableThread function', () => {
      it('should throw InvariantError when thread not available', async () => {
        // Arrange
        await ThreadsTableTestHelper.addThread({ id:'thread-123' }); // memasukan thread baru 
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        // Action & Assert
        await expect( threadRepositoryPostgres.getThreadSpecById('thread-123'))
        .rejects
        .toThrowError(InvariantError);
      });

      it('should not throw InvariantError when thread available', async () => {
        // Arrange
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        // Action & Assert
        await expect( threadRepositoryPostgres.getThreadSpecById('thread-123'))
        .resolves.not
        .toThrowError(InvariantError);
      });
    });

    describe('verifyAvailableComment function', () => {
      it('should throw InvariantError when comment not available', async () => {
        // Arrange
        await ThreadsTableTestHelper.addComment({ id:'comment-123' }); // memasukan comment baru 
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        // Action & Assert
        await expect( threadRepositoryPostgres.getCommentSpecById('comment-123'))
        .rejects
        .toThrowError(InvariantError);
      });

      it('should not throw InvariantError when comment available', async () => {
        // Arrange
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        // Action & Assert
        await expect( threadRepositoryPostgres.getCommentSpecById('comment-123'))
        .resolves.not
        .toThrowError(InvariantError);
      });
    });

    
    describe('verifyAvailableReply function', () => {
      it('should throw InvariantError when reply not available', async () => {
        // Arrange
        await ThreadsTableTestHelper.addReply({ id:'reply-123' }); // memasukan comment baru 
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        // Action & Assert
        await expect( threadRepositoryPostgres.getReplySpecById('reply-123'))
        .rejects
        .toThrowError(InvariantError);
      });

      it('should not throw InvariantError when reply available', async () => {
        // Arrange
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        // Action & Assert
        await expect( threadRepositoryPostgres.getReplySpecById('reply-123'))
        .resolves.not
        .toThrowError(InvariantError);
      });
    });

    describe('addThread function', () => {
      it('should persist new thread and return added thread correctly', async () => {
        // Arrange
        const newThread = new AddedThread({
          body: 'dicoding',
          title: 'Dicoding Indonesia'      
        });

        const fakeIdGenerator = () => '123'; // stub!
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

        // Action
        const addedThread = await threadRepositoryPostgres.addThread(newThread);

        // Assert
        const threads = await ThreadsTableTestHelper.findthreadsById('thread-123');
        expect(addedThread).toStrictEqual(new AddedThread({
          body: 'dicoding',
          title: 'Dicoding Indonesia',
         
        }));
        expect(threads).toHaveLength(1);
      });
    });

    describe('addComment function', () => {
      it('should persist new comment and return added comment correctly', async () => {
        // Arrange
        const newComment= new AddedComment({
          content: 'dicoding' 
        });

        const fakeIdGenerator = () => '123'; // stub!
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

        // Action
        const addedComment= await threadRepositoryPostgres.addComment(newComment);

        // Assert
        const comments = await ThreadsTableTestHelper.findcommentsById('comment-123');
        expect(addedComment).toStrictEqual(new AddedComment({  
          content: 'dicoding'      
        }));
        expect(comments).toHaveLength(1);
      });
    });

    describe('addReply function', () => {
      it('should persist new reply and return added reply correctly', async () => {
        // Arrange
        const newReply= new AddedReply({
          content: 'dicoding'   
        });

        const fakeIdGenerator = () => '123'; // stub!
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

        // Action
        const addedReply= await threadRepositoryPostgres.addReply(newReply);

        // Assert
        const replies = await ThreadsTableTestHelper.findrepliesById('reply-123');
        expect(addedReply).toStrictEqual(new AddedReply({        
          content: 'dicoding'    
        }));
        expect(replies).toHaveLength(1);
      });
    });

    describe('getThreadById', () => {
      it('should throw InvariantError when thread not found', () => {
        // Arrange
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        // Action & Assert
        return expect(threadRepositoryPostgres.getThreadSpecById('thread-321'))
          .rejects
          .toThrowError(InvariantError);
      });

      it('should return body and title when thread is found', async () => {
        // Arrange
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
        await ThreadsTableTestHelper.addThread({
          body: 'dicoding',
          title: 'Dicoding Indonesia' 
        });

        // Action & Assert
        const threadId= await threadRepositoryPostgres.getThreadById('thread-123');
        expect(threadId).toBe('thread-123');
      });
    });

    describe('getCommentById', () => {
      it('should throw InvariantError when comment not found', async () => {
        // Arrange
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        // Action & Assert
        await expect( threadRepositoryPostgres.getCommentSpecById('comment-123'))
          .rejects
          .toThrowError(InvariantError);
      });

      it('should return comment id correctly', async () => {
        // Arrange
        await ThreadsTableTestHelper.addComment({   
          content:'dicoding'  
         });

        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        // Action
        const commentId = await threadRepositoryPostgres.getCommentSpecById('comment-123');

        // Assert
        expect(commentId).toEqual('comment-123');
      });
    });

    describe('getReplyById', () => {
      it('should throw InvariantError when reply not found', async () => {
        // Arrange
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        // Action & Assert
        await expect( threadRepositoryPostgres.getReplySpecById('reply-123'))
          .rejects
          .toThrowError(InvariantError);
      });

      it('should return reply id correctly', async () => {
        // Arrange
        await ThreadsTableTestHelper.addReply({      
          content:'dicoding'   
        });

        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        // Action
        const replyId = await threadRepositoryPostgres.getReplySpecById('reply-123');

        // Assert
        expect(replyId).toEqual('reply-123');
      });
    });

  });
});
