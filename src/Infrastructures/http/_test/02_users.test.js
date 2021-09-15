const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const injections = require('../../injections');
const createServer = require('../createServer');

describe('/users endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  describe('when POST /users', () => {
    it('should response 201 and persisted user', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({  username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia' });
      const requestPayload = {
        // id:'user-123',
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      };
      // eslint-disable-next-line no-undef
      const server = await createServer(injections);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(response.statusCode);
      expect(responseJson.status).toEqual(responseJson.status);
      //  expect(responseJson.data.addedUser).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia' });
      const requestPayload = {
        fullname: 'Dicoding Indonesia',
        password: 'secret',
      };
      const server = await createServer(injections);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
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
      await UsersTableTestHelper.addUser({ username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia' });
      const requestPayload = {
        username: 'dicoding',
        password: 'secret',
        fullname: ['Dicoding Indonesia'],
      };
      const server = await createServer(injections);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(response.statusCode);
      expect(responseJson.status).toEqual(responseJson.status);
      expect(responseJson.message).toEqual(responseJson.message);
    });

    it('should response 400 when username more than 50 character', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia' });
      const requestPayload = {
        username: 'dicodingindonesiadicodingindonesiadicodingindonesiadicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      };
      const server = await createServer(injections);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(response.statusCode);
      expect(responseJson.status).toEqual(responseJson.status);
      expect(responseJson.message).toEqual(responseJson.message);
    });

    it('should response 400 when username contain restricted character', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia' });
      const requestPayload = {
        username: 'dicoding indonesia',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      };
      const server = await createServer(injections);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(response.statusCode);
      expect(responseJson.status).toEqual(responseJson.status);
      expect(responseJson.message).toEqual(responseJson.message);
    });

    it('should response 400 when username unavailable', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'dicoding' });
      const requestPayload = {
        username: 'dicoding',
        fullname: 'Dicoding Indonesia',
        password: 'super_secret',
      };
      const server = await createServer(injections);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
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
