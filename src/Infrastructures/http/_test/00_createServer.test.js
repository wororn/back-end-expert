const createServer = require('../createServer');

describe('HTTP server', () => {
  it('should response 404 when request unregistered route', async () => {
    // Arrange
    const server = await createServer({});

    // Action
    const response = await server.inject({
      method: 'POST',
      url: '/unregisteredRoute',
    });

    // Assert
    expect(response.statusCode).toEqual(404);
  });

  it('should handle error correctly, POST/User', async () => {
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
    expect(response.statusCode).toEqual(response.statusCode);
    expect(responseJson.status).toEqual(responseJson.status);
    expect(responseJson.message).toEqual(responseJson.message);
  });

  it('should handle error correctly, POST/threads', async () => {
    // Arrange
    const dates= new Date().toISOString();
    const requestPayload = {
      id:'thread-123',
      owner:'user-123',
      title: 'Dicoding Indonesia',
      body:'dicoding',
      date :dates,  
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
    expect(response.statusCode).toEqual(response.statusCode);
    expect(responseJson.status).toEqual(responseJson.status);
    expect(responseJson.message).toEqual(responseJson.message);
  });

  it('should handle error correctly, POST/comments', async () => {
    // Arrange
    const dates= new Date().toISOString();
    const requestPayload = {
      id:'comment-123',
      content: 'Dicoding Indonesia',
      thread_id:'thread-123',
      owner:'user-123',
      date :dates,    
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
    expect(response.statusCode).toEqual(response.statusCode);
    expect(responseJson.status).toEqual(responseJson.status);
    expect(responseJson.message).toEqual(responseJson.message);
  });

  it('should handle error correctly, POST/replies', async () => {
    // Arrange
    const dates= new Date().toISOString();
    const requestPayload = {
      id:'reply-123',
      comment_id:'comment-123',
      content: 'Dicoding Indonesia',
      owner:'user-123',
      date :dates, 
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
    expect(response.statusCode).toEqual(response.statusCode);
    expect(responseJson.status).toEqual(responseJson.status);
    expect(responseJson.message).toEqual(responseJson.message);
  });


  it('should handle error correctly, GET/threads', async () => {
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
    expect(response.statusCode).toEqual(response.statusCode);
    expect(responseJson.status).toEqual(responseJson.status);
    expect(responseJson.message).toEqual(responseJson.message);
  });

  it('should handle error correctly, DELETE/comments', async () => {
    // Arrange

    const requestPayload = {
      id: 'comment-123', 
      thread_id:'thread-123'

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
    expect(response.statusCode).toEqual(response.statusCode);
    expect(responseJson.status).toEqual(responseJson.status);
    expect(responseJson.message).toEqual(responseJson.message);
  });

  
  it('should handle error correctly, DELETE/replies', async () => {
    // Arrange
    const requestPayload = {
      id: 'reply-123',    
      comment_id:'comment-123'
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
    expect(response.statusCode).toEqual(response.statusCode);
    expect(responseJson.status).toEqual(responseJson.status);
    expect(responseJson.message).toEqual(responseJson.message);
  });

});
