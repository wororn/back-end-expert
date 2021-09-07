/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    
    pgm.createTable('replies', {
        id: {
            primaryKey: true,
            type: 'VARCHAR(50)',
            notNull: true,
        },

        comment_id: {
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

   pgm.addConstraint('replies', 'fk_replies.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
   pgm.addConstraint('replies', 'unique_comment_id ', 'UNIQUE(comment_id)');
   pgm.addConstraint('replies', 'fk_replies.comment_id_comments.id', 'FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE');
   
}

exports.down = pgm => {

    pgm.dropTable('replies');
};
