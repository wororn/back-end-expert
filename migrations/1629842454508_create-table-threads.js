/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('threads', {
        id: {
            primaryKey: true,
            type: 'TEXT',
            notNull: true,
        },

        title: {
            type: 'TEXT',
            notNull: true,
          },
        
        body: {
            type: 'TEXT',
            notNull: true,
          },

        date: {
            type: 'VARCHAR(70)',
            notNull: true,
          },

        owner: {
            type: 'VARCHAR(50)',
            notNull: true,
          },

      });

      pgm.addConstraint('threads', 'fk_threads.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
    
};

exports.down = pgm => {
    pgm.dropTable('threads');
};
