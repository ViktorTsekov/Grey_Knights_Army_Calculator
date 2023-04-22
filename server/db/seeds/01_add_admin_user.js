/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex("users").insert([
    {name: "admin", password: "$2b$10$XQlOYc1ojszs3q.gkYRKS.R1gpY5Z9BPvWPaApjG/dqo8i1GoO9uO", role: "admin"}
  ]).then(async () => {
    let userId = 0

    await knex("users")
      .select("id")
      .where({name: "admin"})
      .then((result) => {
        userId = result[0].id
      })

    await knex("users_details").insert({
      user_id: userId,
      date_of_registration: "-",
    })
  })
}
