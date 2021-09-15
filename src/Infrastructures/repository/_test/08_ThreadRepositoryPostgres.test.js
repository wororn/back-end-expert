const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const AddedComment = require('../../../Domains/threads/entities/AddedComment');
const AddedReply = require('../../../Domains/threads/entities/AddedReply');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('threadRepositoryPostgres', () => {
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

describe('addThread function', () => {
  it('should persist new thread and return added thread correctly', async () => {
    // Arrange
    // const dates= new Date().toISOString();
    const newThread = new AddedThread({
      title: 'Dicoding Indonesia', 
      id:'thread-123',
      owner:'user-123'
      // date :dates      
    });
    
    const fakeIdGenerator = () => '123'; // stub!
    const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
    const owner='user-123';
    // Action
    const addedThread = await threadRepositoryPostgres.addThread(owner,newThread);

    // Assert
    const threads = await ThreadsTableTestHelper.findthreadsById('thread-123');
    expect(addedThread).toStrictEqual({
      id:'thread-123',
      title: 'Dicoding Indonesia', 
      owner:'user-123'
    });
    expect(threads).toHaveLength(1);
  });
});

describe('addComment function', () => {
  it('should persist new comment and return added comment correctly', async () => {
    // Arrange
    // const dates= new Date().toISOString();
    const newComment= new AddedComment({
      id:'comment-123',
      content: 'Dicoding Indonesia' ,
      owner:'user-123'
      // date : dates
    });

    const fakeIdGenerator = () => '123'; // stub!
    const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
    const owner='user-123';
    const threadId='thread-123';
    // Action
    const addedComment= await threadRepositoryPostgres.addComment(owner,threadId,newComment);

    // Assert
    const comments = await ThreadsTableTestHelper.findcommentsById('comment-123');
    expect(addedComment).toStrictEqual({  
      id:'comment-123',
      content: 'Dicoding Indonesia'  ,
      owner:'user-123'    
    });
    expect(comments).toHaveLength(1);
  });
});

describe('addReply function', () => {
  it('should persist new reply and return added reply correctly', async () => {
    // Arrange
    // const dates= new Date().toISOString();
    const newReply= new AddedReply({
      id:'reply-123',
      content: 'Dicoding Indonesia' ,
      owner:'user-123'
    });

    const fakeIdGenerator = () => '123'; // stub!
    const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
    const owner='user-123';
    const commentId='comment-123';
    // Action
    const addedReply= await threadRepositoryPostgres.addReply(owner,commentId,newReply);

    // Assert
    const replies = await ThreadsTableTestHelper.findrepliesById('reply-123');
    expect(addedReply).toStrictEqual({        
      id:'reply-123',
      content: 'Dicoding Indonesia' ,
      owner:'user-123'   
    });
    expect(replies).toHaveLength(1);
  });
});

    describe('verifyAvailableThread function', () => {
      it('should throw InvariantError when thread not available', async () => {
        // Arrange
        const dates= new Date().toISOString();
        const owner='user-123';
        await ThreadsTableTestHelper.addThread({ id:'thread-123',title: 'Dicoding Indonesia',body:'dicoding',date:dates,owner:owner  }); // memasukan thread baru 
        
        const fakeIdGenerator = () => '123'; // stub!
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
       
        // Action & Assert
        await expect( threadRepositoryPostgres.getThreadSpecById('thread-321'))
        .rejects
        .toThrowError(InvariantError);
      });

      it('should not throw InvariantError when thread available', async () => {
        // Arrange
        const owner='user-123';
        const dates= new Date().toISOString();
        await ThreadsTableTestHelper.addThread({ id:'thread-123',title: 'Dicoding Indonesia',body:'dicoding',date:dates, owner:owner }); // memasukan thread baru 
        
        const fakeIdGenerator = () => '123'; // stub!
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
       
        // Action & Assert
        await expect(threadRepositoryPostgres.getThreadSpecById('thread-123'))
        .resolves.not
        .toThrowError(InvariantError);
      });
    });

    describe('verifyAvailableComment function', () => {
      it('should throw InvariantError when comment not available', async () => {
        // Arrange
        const owner='user-123';
        const dates= new Date().toISOString();
        await ThreadsTableTestHelper.addComment({ id:'comment-123',content:'Dicoding Indonesia', thread_id:'thread-123',date:dates,owner:owner }); // memasukan comment baru 
       
        const fakeIdGenerator = () => '123'; // stub!
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      
        // Action & Assert
        await expect( threadRepositoryPostgres.getCommentSpecById('comment-321'))
        .rejects
        .toThrowError(InvariantError);
      });

      it('should not throw InvariantError when comment available', async () => {
        // Arrange
        const owner='user-123';
        const dates= new Date().toISOString();
        await ThreadsTableTestHelper.addComment({ id:'comment-123',content:'Dicoding Indonesia', thread_id:'thread-123',date:dates, owner:owner }); // memasukan comment baru 
        
        const fakeIdGenerator = () => '123'; // stub!
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
       
        // Action & Assert
        await expect( threadRepositoryPostgres.getCommentSpecById('comment-123'))
        .resolves.not
        .toThrowError(InvariantError);
      });
    });

    
    describe('verifyAvailableReply function', () => {
      it('should throw InvariantError when reply not available', async () => {
        // Arrange
        const owner='user-123';
        const dates= new Date().toISOString();
        await ThreadsTableTestHelper.addReply({ id:'reply-123',content:'Dicoding Indonesia', comment_id:'comment-123',date:dates, owner:owner }); // memasukan comment baru 
       
        const fakeIdGenerator = () => '123'; // stub!
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      
        // Action & Assert
        await expect( threadRepositoryPostgres.getReplySpecById('reply-321'))
        .rejects
        .toThrowError(InvariantError);
      });

      it('should not throw InvariantError when reply available', async () => {
        // Arrange
        const owner='user-123';
        const dates= new Date().toISOString();
        await ThreadsTableTestHelper.addReply({ id:'reply-123',content:'Dicoding Indonesia', comment_id:'comment-123',date:dates,owner:owner }); // memasukan comment baru 
        
        const fakeIdGenerator = () => '123'; // stub!
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
       
        const newReply= {
          id:'reply-123',
          content: 'Dicoding Indonesia' ,
          owner:'user-123'
        };

        const commentId='comment-123';
        // Action
        // await threadRepositoryPostgres.addReply(owner,commentId,newReply);
     
        // Action & Assert
        await expect( threadRepositoryPostgres.getReplySpecById('reply-123'))
        .resolves.not
        .toThrowError(InvariantError);
      });
    });

  });
});
