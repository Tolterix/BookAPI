
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {id: 1, book_title: 'Harry Potter & The Sorceror\'s Stone', author: 'J.K.Rowling', isbn_number: '000-0-00-000000-0', checked_out: false, checkout_id: null, due_date: 0},
        {id: 2, book_title: 'Harry Potter & The Chamber of Secrets', author: 'J.K.Rowling', isbn_number: '000-0-00-000000-1', checked_out: true, checkout_id: 2, due_date: 0},
        {id: 3, book_title: 'Harry Potter & The Prisoner of Azkaban', author: 'J.K.Rowling', isbn_number: '000-0-00-000000-2', checked_out: true, checkout_id: 3, due_date: 0},
        {id: 4, book_title: 'Harry Potter & The Goblet of Fire', author: 'J.K.Rowling', isbn_number: '000-0-00-000000-3', checked_out: true, checkout_id: 1, due_date: 0},
        {id: 5, book_title: 'Harry Potter & The Order of the Phoenix', author: 'J.K.Rowling', isbn_number: '000-0-00-000000-4', checked_out: false, checkout_id: null, due_date: 0},
        {id: 6, book_title: 'Harry Potter & The Half-Blood Prince', author: 'J.K.Rowling', isbn_number: '000-0-00-000000-5', checked_out: false, checkout_id: null, due_date: 0},
        {id: 7, book_title: 'Harry Potter & The Deathly Hollows Pt.1', author: 'J.K.Rowling', isbn_number: '000-0-00-000000-6', checked_out: false, checkout_id: null, due_date: 0},
        {id: 8, book_title: 'Harry Potter & The Deathly Hollows Pt.2', author: 'J.K.Rowling', isbn_number: '000-0-00-000000-7', checked_out: false, checkout_id: null, due_date: 0},
      ]);
    });
};
