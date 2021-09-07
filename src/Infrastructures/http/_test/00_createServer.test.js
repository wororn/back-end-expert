const createServer = require('../createServer');

describe('HTTP server', () => {
  it('should response 404 when request unregistered route', async () => {
    // Arrange
    const server = await createServer({});

    // Action
    const response = await server.inject({
      method: 'GET',
      url: '/unregisteredRoute',
    });

    // Assert
    expect(response.statusCode).toEqual(404);
  });

  it('should handle server error correctly, POST/User', async () => {
    // Arrange
    const requestPayload = {
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
      password: 'secret',
    };
    const server = await createServer({}); // fake injection

    // Action
    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: requestPayload,
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual('error');
    expect(responseJson.message).toEqual('terjadi kegagalan pada server kami');
  });

  it('should handle server error correctly, POST/threads', async () => {
    // Arrange
    const requestPayload = {
      title: 'dicoding',
      body: 'Dicoding Indonesia'   
    };
    const server = await createServer({}); // fake injection

    // Action
    const response = await server.inject({
      method: 'POST',
      url: '/threads',
      payload: requestPayload,
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual('error');
    expect(responseJson.message).toEqual('terjadi kegagalan pada server kami');
  });

  it('should handle server error correctly, POST/comments', async () => {
    // Arrange
    const requestPayload = {
      content: 'dicoding',    
    };
    const server = await createServer({}); // fake injection

    // Action
    const response = await server.inject({
      method: 'POST',
      url: '/threads/{threadId}/comments',
      payload: requestPayload,
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual('error');
    expect(responseJson.message).toEqual('terjadi kegagalan pada server kami');
  });

  it('should handle server error correctly, POST/replies', async () => {
    // Arrange
    const requestPayload = {
      content: 'dicoding' 
    };
    const server = await createServer({}); // fake injection

    // Action
    const response = await server.inject({
      method: 'POST',
      url: '/threads/{threadId}/comments/{commentId}/replies',
      payload: requestPayload,
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual('error');
    expect(responseJson.message).toEqual('terjadi kegagalan pada server kami');
  });


  it('should handle server error correctly, GET/threads', async () => {
    // Arrange
    const requestPayload = {
      id:'thread-123'
    };
    const server = await createServer({}); // fake injection

    // Action
    const response = await server.inject({
      method: 'GET',
      url: '/threads/{threadId}',
      payload: requestPayload,
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual('error');
    expect(responseJson.message).toEqual('terjadi kegagalan pada server kami');
  });

  it('should handle server error correctly, DELETE/comments', async () => {
    // Arrange
    const requestPayload = {
      id: 'comment-123', 

    };
    const server = await createServer({}); // fake injection

    // Action
    const response = await server.inject({
      method: 'DELETE',
      url: '/threads/{threadId}/comments/{commentId}',
      payload: requestPayload,
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual('error');
    expect(responseJson.message).toEqual('terjadi kegagalan pada server kami');
  });

  
  it('should handle server error correctly, DELETE/replies', async () => {
    // Arrange
    const requestPayload = {
      id: 'reply-123',    
    };
    const server = await createServer({}); // fake injection
  
    // Action
    const response = await server.inject({
      method: 'DELETE',
      url: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
      payload: requestPayload,
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual('error');
    expect(responseJson.message).toEqual('terjadi kegagalan pada server kami');
  });

});
