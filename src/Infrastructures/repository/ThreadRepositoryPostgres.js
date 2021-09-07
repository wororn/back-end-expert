const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
   
  }

  async addThread(owner,newThread) {
    
    const id = `thread-${this._idGenerator()}`;
    const { 
      title,
      body,
     } = newThread;
  
    const date= new Date().toISOString();
   
    const query = {
      text: 'INSERT INTO threads VALUES($1,$2,$3,$4,$5) RETURNING id,title,owner',
      values: [id,title,body,date,owner],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      
      throw new  InvariantError('Gagal menambah Thread');
    
    }

    return new newThread(
      { ...result.rows[0]
      }); 
    
  }

  async addComment(owner,threadId,newComment) {
   
    const id = `comment-${this._idGenerator()}`;
    const {  
        content    
    } = newComment;

    const date= new Date().toISOString();
    const [is_delete]=false;
    
    const query = {
      text: 'INSERT INTO comments VALUES($1,$2,$3,$4,$5,$6) RETURNING id,content,owner',
      values: [id,threadId,content,date,owner,is_delete],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      
      throw new  InvariantError('Gagal menambah Komentar');
    
    }

    return result.rows[0];
     
  }

  async addReply(owner,commentId,newReply) {
    
    const id = `reply-${this._idGenerator()}`; 
    const { 
       content   
    } = newReply;
   
    const date= new Date().toISOString();
    const[is_delete]=false;
    
    const query = {
      text: 'INSERT INTO replies VALUES($1,$2,$3,$4,$5,$6) RETURNING id,content,owner',
      values: [id,commentId,content,date,owner,is_delete],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      
      throw new  InvariantError('Gagal menambah Balasan');
    
    }

    return result.rows[0];
     
  }

  async getThreadById(threadId) {
    const query = {
      text: 
            `SELECT distinct threads.id, threads.title, threads.body, threads.date, users.username,
             threads.commentID as comments.id, threads.COMUsername as comments.username,
             threads.commentDATE as comments.date,threads.COMcontent as comments.content, 
             threads.replyID as comments.replies.id, threads.REPUsername as comments.replies.username,
             threads.REPDate as comments.replies.date,threads.REPContent as comments.replies.content,
             FROM 
                  (
                    SELECT distinct threads.id,threads.title,threads.body,threads.date,comments.id as commentID,
                    comments.date as commentDATE,comments.content as COMContent,comments.COMUsername as COMUsername,
                    comments.replyID as replyID,comments.REPContent as REPContent,comments.REPDate as REPDate,
                    comments.REPUsername as REPUsername
                    FROM threads
                    LEFT JOIN ( 
                          select distinct id,thread_id,date,content,users.username as COMUsername,replies.replyID,
                          replies.REPContent,replies.REPDate,replies.REPUsername
                          from comments
                                LEFT JOIN ( 
                                    select distinct id as replyID,content as REPContent ,date as REPdate,users.username as REPUsername
                                    from replies
                                    LEFT JOIN users ON replies.owner=users.id 
                                      ) replies on comments.id=replies.comment_id 
                                LEFT JOIN users ON comments.owner=users.id 
                         ) comments ON threads.id=comments.thread_id 
                    WHERE threads.id= $1
                  ) threads
              LEFT JOIN users ON threads.owner=users.id  `
              ,
      values: [threadId]
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      
      throw new NotFoundError('Gagal mendapatkan Detail Threads');
    
    }
    
    return result.rows[0];
  }

  async getCommentById(commentId) {
    const query = {
      text: 
            `SELECT threads.commentID as commentId
              FROM 
                  ( SELECT threads.id as threadID,comments.id as commentID
                    FROM threads
                    INNER JOIN comments ON threads.comment_id=comments.id
                    WHERE comments.id= $1
                    GROUP BY threads.id,comments.id
                  ) threads
             `,
      values: [commentId]
    };
    const result = await this._pool.query(query);
    
    return result.rows[0];

  }

  async getReplyById(replyId) {
    const query = {
      text: 
            `SELECT comments.replyID as replyId
              FROM 
                  ( SELECT comments.id as commentID,replies.id as replyID
                    FROM comments
                    INNER JOIN replies ON replies.comment_id=comments.id
                    WHERE replies.id= $1
                    GROUP BY comments.id,replies.id
                  ) comments
             `,
      values: [replyId]
    };
    const result = await this._pool.query(query);
    
    return result.rows[0];

  }

  async deleteCommentById(threadId,commentId) 
    
  {
        const [is_delete]= true ;
        const content="**komentar telah dihapus**";
        
        const query = {
          text: `UPDATE comments SET content=$2 is_delete=$3 WHERE Id= $1 and thread_id=$4 RETURNING id`,
          values: [commentId,content,is_delete,threadId]
        };

        const result = await this._pool.query(query);

        if (!result.rowCount ) {
          throw new NotFoundError('Gagal menghapus Komentar. Id tidak ditemukan');
        }

  }

  async deleteReplyById(threadId,commentId,replyId) 
    
  {
     
      const [is_delete] = true;
      const content="**balasan telah dihapus**";
     
      const query = {
        text: ` UPDATE replies SET content=$2 is_delete=$3 WHERE Id= $1 and comment_id=$4 and comment_id
                in ( 
                      select distinct comments.id as comment_id from comments 
                      inner join threads on comments.thread_id=threads.id
                      where threads.id=$5
                      )
                RETURNING id `,
        values: [replyId,content,is_delete,commentId,threadId]
      };

      const result = await this._pool.query(query);

      if (!result.rowCount ) {
        throw new NotFoundError('Gagal menghapus Balasan. Id tidak ditemukan');
      }

  }

  async getThreadSpecById(threadId) {
    
    const query = {
      text: 'SELECT id as threadId FROM threads WHERE id = $1',
      values: [threadId]
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Thread ID tidak ditemukan');
    }

    return result.rows[0];
   
  }

async getCommentSpecById(commentId) {
  
    const query = {
      text: 'SELECT id as commentId FROM comments WHERE id = $1',
      values: [commentId]
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Komentar ID tidak ditemukan');
    }

    return  result.rows[0];
  
    }

  
async getReplySpecById(replyId) {
  
  const query = {
    text: 'SELECT id as replyId FROM replies WHERE id = $1',
    values: [replyId]
  };
  const result = await this._pool.query(query);
  if (!result.rows.length) {
    throw new InvariantError('Balasan ID tidak ditemukan');
  }

  return  result.rows[0];

  }

    async verifyUserOwner(owner) {
     
      const query = {
        text: 
            ` SELECT id as owner FROM Users 
              WHERE id = $1 `,
        values: [owner]
      };
      const result = await this._pool.query(query);
      if (!result.rows.length) {      
        throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
      }
    
    }


    async verifyThreadOwner(threadId,owner) {
     
      const query = {
        text: 
            ` SELECT id as threadId,owner 
              FROM threads 
              INNER JOIN users ON threads.owner=users.id  
              WHERE id = $1 and owner=$2`,
        values: [threadId,owner]
      };
      const result = await this._pool.query(query);
      if (!result.rows.length) {      
        throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
      }
    
    }

    async verifyCommentOwner(commentId,owner) {
     
      const query = {
        text: 
            ` SELECT id as commentId,owner 
              FROM comments 
              INNER JOIN users ON comments.owner=users.id  
              WHERE id = $1 and owner=$2`,
        values: [commentId,owner]
      };
      const result = await this._pool.query(query);
      if (!result.rows.length) {      
        throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
      }
    
    }

}

module.exports = ThreadRepositoryPostgres;
