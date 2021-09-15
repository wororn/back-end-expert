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
            notNull: false,
          },

        date: {
            type: 'VARCHAR(70)',
            notNull:false,
          },

        owner: {
            type: 'VARCHAR(50)',
            notNull: false,
          },

      });
 
};

exports.down = pgm => {
    pgm.dropTable('threads');
};
