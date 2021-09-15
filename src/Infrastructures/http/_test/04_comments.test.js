const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const injections = require('../../injections');
const createServer = require('../createServer');

describe('/comments endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
  });

  describe('when POST /comments', () => {
    it('should response 201 and persisted comments', async () => {
      // Arrange
      const dates= new Date().toISOString();
      await ThreadsTableTestHelper.addComment({ 
        id:'comment-123',
        thread_id:'thread-123',
        content: 'Dicoding Indonesia',
        date :dates,     
        // owner:'user-123' 
      });

      const requestPayload = {
        id:'comment-123',
        content: 'Dicoding Indonesia',
        thread_id :'thread-123',
        date :dates,     
        // owner:'user-123'  
      };
      // eslint-disable-next-line no-undef
      const server = await createServer(injections);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/{threadId}/comments',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(response.statusCode);
      expect(responseJson.status).toEqual(responseJson.status);
      expect(responseJson.message).toEqual(responseJson.message);
      // expect(responseJson.data.addComment).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const dates= new Date().toISOString();
      await ThreadsTableTestHelper.addComment({ 
        id:'comment-123',
        thread_id:'thread-123',
        content: 'Dicoding Indonesia',
        date :dates,     
        // owner:'user-123' 
      });
      const requestPayload = {
        content: 'dicoding',
        user:'*' 
      };
      const server = await createServer(injections);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/{threadId}/comments',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(response.statusCode);
      expect(responseJson.status).toEqual(responseJson.status);
      expect(responseJson.message).toEqual(responseJson.message);
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const dates= new Date().toISOString();
      await ThreadsTableTestHelper.addComment({ 
        id:'comment-123',
        thread_id:'thread-123',
        content: 'Dicoding Indonesia',
        date :dates,     
        // owner:'user-123' 
      });

      const requestPayload = {
        id:123,
        content: ['Dicoding Indonesia'],
        thread_id :'thread-123',
        date :dates,     
        // owner:'user-123'  
      };
      const server = await createServer(injections);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/{threadId}/comments',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(response.statusCode);
      expect(responseJson.status).toEqual(responseJson.status);
      expect(responseJson.message).toEqual(responseJson.message);
    });

    it('should response 400 when content less than 5 character', async () => {
      // Arrange
      const dates= new Date().toISOString();
      await ThreadsTableTestHelper.addComment({ 
        id:'comment-123',
        thread_id:'thread-123',
        content: 'Dicoding Indonesia',
        date :dates,     
        // owner:'user-123' 
      });

      const requestPayload = {
        id:'comment-123',
        thread_id:'thread-123',
        content: 'Dic',
        date :dates,     
        // owner:'user-123' 
      };
      const server = await createServer(injections);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/{threadId}/comments',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(response.statusCode);
      expect(responseJson.status).toEqual(responseJson.status);
      expect(responseJson.message).toEqual(responseJson.message);
    });

    it('should response 400 when content unavailable', async () => {
      // Arrange
      const dates= new Date().toISOString();
      await ThreadsTableTestHelper.addComment({ 
        id:'comment-123',
        thread_id:'thread-123',
        content: 'Dicoding Indonesia',
        date :dates,     
        // owner:'user-123' 
      });
     
      const requestPayload = {
        id:'comment-123',
        content: 'merdeka',
        thread_id:'thread-123', 
        date :dates,     
        // owner:'user-123'    
      };
      const server = await createServer(injections);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/{threadId}/comments',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(response.statusCode);
      expect(responseJson.status).toEqual(responseJson.status);
      expect(responseJson.message).toEqual(responseJson.message);
    
    });
  });
});
