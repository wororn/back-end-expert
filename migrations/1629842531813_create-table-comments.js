/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.createTable('comments', {
        id: {
            primaryKey: true,
            type: 'VARCHAR(50)',
            notNull: true,
        },

        thread_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            unique: true,
        },

        content: {
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

        is_delete: {
            type: 'VARCHAR(50)',
            notNull: false,
        }

    });

    pgm.addConstraint('comments', 'fk_comments.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
    pgm.addConstraint('comments', 'unique_thread_id', 'UNIQUE(thread_id)');
    pgm.addConstraint('comments', 'fk_comments.thread_id_threads.id', 'FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE');
   
};

exports.down = pgm => {

    pgm.dropTable('comments');
};
