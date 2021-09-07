const routes = (handler) => ([
    {
      method: 'POST',
      path: '/threads',
      handler: handler.postThreadHandler,
      options: {
        auth: 'forumapi_jwt',
      },
    },

    {
        method: 'GET',
        path: '/threads/{threadId}',
        handler: handler.getThreadsByIdHandler,
      },

    {
        method: 'POST',
        path: '/threads/{threadId}/comments',
        handler: handler.postCommentHandler,
        options: {
          auth: 'forumapi_jwt',
        },
    },

    {
      method: 'POST',
      path: '/threads/{threadId}/comments/{commentId}/replies',
      handler: handler.postReplyHandler,
      options: {
        auth: 'forumapi_jwt',
      },
    },

    {
        method: 'DELETE',
        path: '/threads/{threadId}/comments/{commentId}',
        handler: handler.deleteCommentByIdHandler,
        options: {
          auth: 'forumapi_jwt',
        },
    },

    {
      method: 'DELETE',
      path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
      handler: handler.deleteReplyByIdHandler,
      options: {
        auth: 'forumapi_jwt',
      },
    },

  ]);
  
  module.exports = routes;
  