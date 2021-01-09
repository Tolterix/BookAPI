
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('librarians').del()
      .then(function () {
        // Inserts seed entries
        return knex('librarians').insert([
          {id: 1, librarian_id: 1, librarian_email: 'jpbrown87@gmail.com'},
          {id: 2, librarian_id: 2, librarian_email: 'mrampian@ampianspalace.com'},
          {id: 3, librarian_id: 3, librarian_email: 'brandon.campbell@galvanize.com'},
        ]);
      });
  };
  