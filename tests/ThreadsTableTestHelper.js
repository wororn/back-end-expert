/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');
const day= new Date().toISOString();
const ThreadsTableTestHelper = {
  
  async addThread({
    id='thread-123', body ='dicoding', title ='Dicoding Indonesia', date = day,owner='user-123'
  }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4,$5)',
      values: [id,body,title,date,owner],
    };

    await pool.query(query);
  },

  async addComment({
    id='comment-123', content='Dicoding Indonesia', thread_id='thread-123',date = day,owner='user-123'
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5)',
      values: [id,content,thread_id,date,owner],
    };

    await pool.query(query);
  },

  async addReply({
    id='reply-123', content='Dicoding Indonesia', comment_id='comment-123',date = day, owner='user-123'
  }) {
    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4, $5)',
      values: [id,content,comment_id,date,owner],
    };

    await pool.query(query);
  },

  async findthreadsById(id) {
    const query = {
      text: 'SELECT id FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async findcommentsById(id) {
    const query = {
      text: 'SELECT id FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async findrepliesById(id) {
    const query = {
      text: 'SELECT id FROM replies WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM threads WHERE 1=1');
    await pool.query('DELETE FROM comments WHERE 1=1');
    await pool.query('DELETE FROM replies WHERE 1=1');
  },
};

module.exports = ThreadsTableTestHelper;
