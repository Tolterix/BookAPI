
exports.up = function(knex) {
    return knex.schema.createTable('books', table => {
        table.increments('id').notNullable();
        table.string('book_title').notNullable();
        table.string('author');
        table.string('isbn_number');
        table.boolean('checked_out').notNullable();
        table.integer('checkout_id');
        table.integer('due_date');
		table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('books');
};
