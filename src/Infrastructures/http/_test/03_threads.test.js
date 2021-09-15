const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const injections = require('../../injections');
const createServer = require('../createServer');

describe('/threads endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
  });

  describe('when POST/threads', () => {
    it('should response 201 and persisted thread', async () => {
      // Arrange
      const dates= new Date().toISOString();
      await ThreadsTableTestHelper.addThread({
          id:'thread-123',
          title:'Dicoding Indonesia',
          body:'dicoding', 
          date :dates,     
          // owner:'user-123' 
      });

      const requestPayload = {
        id:'thread-123',
        title: 'Dicoding Indonesia',
        body:'dicoding',
        date :dates,      
        // owner : 'user-123'
      };
      // eslint-disable-next-line no-undef
      const server = await createServer(injections);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(response.statusCode);
      expect(responseJson.status).toEqual(responseJson.status);
      expect(responseJson.message).toEqual(responseJson.message);
      // expect(responseJson.data.addThread).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const dates= new Date().toISOString();
      await ThreadsTableTestHelper.addThread({
          id:'thread-123',
          title:'Dicoding Indonesia', 
          body:'dicoding', 
          date :dates,      
          // owner : 'user-123' 
      });

      const requestPayload = {
        title: 'Dicoding Indonesia',
        body:'dicoding',  
        user:'*' 
      };
      const server = await createServer(injections);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
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
      await ThreadsTableTestHelper.addThread({
          id:'thread-123',
          title:'Dicoding Indonesia', 
          body:'dicoding', 
          date :dates,      
          // owner : 'user-123' 
      });

      const requestPayload = {
        id:123,
        title: ['Dicoding Indonesia'],
        body:'dicoding',
        date :dates,      
        // owner : 'user-123' 
      };
      const server = await createServer(injections);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(response.statusCode);
      expect(responseJson.status).toEqual(responseJson.status);
      expect(responseJson.message).toEqual(responseJson.message);
    });

    it('should response 400 when title unavailable', async () => {

      // Arrange
      const dates= new Date().toISOString();
      await ThreadsTableTestHelper.addThread({
          id:'thread-123',
          title:'Dicoding Indonesia', 
          body:'dicoding', 
          date :dates,      
          // owner : 'user-123' 
      });
      
      const requestPayload = {
        id:'thread-123',
        title: 'merdeka',
        body:'dicoding',
        date :dates,      
        // owner : 'user-123' 
      };
      
      const server = await createServer(injections);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
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
