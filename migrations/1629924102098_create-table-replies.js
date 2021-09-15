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
            notNull: false,
            unique: false,
        },

        content: {
            type: 'TEXT',
            notNull: true,
        },

        date: {
            type: 'VARCHAR(70)',
            notNull: false,
        },

        owner: {
            type: 'VARCHAR(50)',
            notNull: false,
        },

        is_delete: {
            type: 'VARCHAR(50)',
            notNull: false,
        }

   });

}

exports.down = pgm => {

    pgm.dropTable('replies');
};
