
exports.up = function(knex) {
    return knex.schema.createTable('librarians', table => {
        table.increments('id').notNullable();
        table.integer('librarian_id').notNullable();
        table.string('librarian_email').notNullable();

        table.foreign('librarian_id').references('id').inTable('users');
        table.foreign('librarian_email').references('email').inTable('users');
		table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('librarians');
};
