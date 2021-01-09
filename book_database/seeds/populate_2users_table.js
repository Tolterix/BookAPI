
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {id: 1, email: 'jpbrown87@gmail.com', password: 'password'},
          {id: 2, email: 'mrampian@ampianspalace.com', password: 'password'},
          {id: 3, email: 'brandon.campbell@galvanize.com', password: 'password'},
        ]);
      });
  };
  