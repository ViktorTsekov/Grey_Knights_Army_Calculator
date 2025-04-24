/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex("users")
  .select("id")
  .where({name: "admin"})
  .then(async (result) => {
    if(result[0] !== undefined) {
    	 await knex("users_details").del().where({user_id: result[0].id});
    }
  });

  await knex("users").del().where({name: "admin"});

  await knex("users").insert([
    {name: "admin", password: "$2b$10$XQlOYc1ojszs3q.gkYRKS.R1gpY5Z9BPvWPaApjG/dqo8i1GoO9uO", role: "admin"}
  ]).then(async () => {
    await knex("users")
      .select("id")
      .where({name: "admin"})
      .then(async (result) => {
        await knex("users_details").insert({
          user_id: result[0].id,
          date_of_registration: "-",
        })
      })
  });
}
