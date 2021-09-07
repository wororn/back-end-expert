
const ClientError=require('../../../../Commons/exceptions/ClientError');

class ThreadsHandler {
    constructor({
      addThreadUseCase,
      addCommentUseCase,
      addReplyUseCase,
      detailThreadUseCase,
      deleteCommentUseCase,
      deleteReplyUseCase
     }) 
    {
      this._addThreadUseCase = addThreadUseCase;
      this._addCommentUseCase = addCommentUseCase;
      this._addReplyUseCase = addReplyUseCase;
      this._detailThreadUseCase = detailThreadUseCase;
      this._deleteCommentUseCase = deleteCommentUseCase;
      this._deleteReplyUseCase = deleteReplyUseCase;
     
      this.postThreadHandler = this.postThreadHandler.bind(this);
      this.postCommentHandler = this.postCommentHandler.bind(this);
      this.postReplyHandler = this.postReplyHandler.bind(this);
      this.getThreadsByIdHandler = this.getThreadsByIdHandler.bind(this);
      this.deleteCommentByIdHandler = this.deleteCommentByIdHandler.bind(this);
      this.deleteReplyByIdHandler = this.deleteReplyByIdHandler.bind(this);
    }
  
      async postThreadHandler(request, h) {
        try {
        
            const { id: owner } = request.auth.credentials;
           
            const addedThread= await this._addThreadUseCase.execute(owner,request.payload);

            let addThreades=addedThread;
            
            const response = h.response({
              status: 'success',
              data: {
               addedThread : addThreades.filter((thread)=>({
                  title:thread.title,
                  owner: owner
               }))
              },
            });
            response.code(201);
            return response;

        } catch (error) {
          if (error instanceof ClientError) {
            const response = h.response({
              status: 'fail',
              message: error.message,
            });
            response.code(error.statusCode);
            return response;
        }

        // Server ERROR!
        const response = h.response({
          status: 'error',
          message: 'Maaf, terjadi kegagalan pada server kami.',
        });
        response.code(500);
        console.error(error);
        return response;
      }

    }

    async postCommentHandler(request, h) {
      try {
       
          const { id: owner } = request.auth.credentials;
          const threadId = request.params;
          const addedComment= await this._addCommentUseCase.execute(owner,threadId,request.payload);
          
          let addCommentes=addedComment;

          const response = h.response({
            status: 'success',
            data: {
              addedComment: addCommentes.filter((comment)=>({
                id: comment.id,
                content:comment.content,
                owner: owner
             }))
            },
          });
          response.code(201);
          return response;

      } catch (error) {
        if (error instanceof ClientError) {
          const response = h.response({
            status: 'fail',
            message: error.message,
          });
          response.code(error.statusCode);
          return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }

  }

  async postReplyHandler(request, h) {
    try {
        const { id: owner } = request.auth.credentials;
        const commentId = request.params;
        const addedReply= await this._addReplyUseCase.execute(owner,commentId,request.payload);

        let addReplies=addedReply;

        const response = h.response({
          status: 'success',
          data: {
            addedReply : addReplies.filter((reply)=>({
              id: reply.id,
              content:reply.content,
              owner: owner
           }))
          },
        });
        response.code(201);
        return response;

    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
    }

    // Server ERROR!
    const response = h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.',
    });
    response.code(500);
    console.error(error);
    return response;
  }

}

  async getThreadsByIdHandler(request) {
   
    const thread= await this._detailThreadUseCase.execute(request.payload);
     let getThread=thread.map(getThread);
    return {
      status: 'success',
      data: {
        thread :getThread
      },
    };
  }
 
  async deleteCommentByIdHandler(request) {
    const { id: owner } = request.auth.credentials;
    const {threadId,commentId }= request.params;
    await this._deleteCommentUseCase.execute(owner,threadId,commentId);
   
    return {
      status: 'success',
      message: 'Komentar berhasil dihapus'
    };
  }

  async deleteReplyByIdHandler(request) {
    const { id: owner } = request.auth.credentials;
    const {threadId,commentId,replyId }= request.params;
  
    await this._deleteReplyUseCase.execute(owner,threadId,commentId,replyId);
   
    return {
      status: 'success',
      message: 'Komentar berhasil dihapus'
    };
  }
    
}
  
  module.exports = ThreadsHandler;
  