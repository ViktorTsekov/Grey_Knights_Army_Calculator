/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex("users").insert([
    {name: "admin", password: "$2b$10$XQlOYc1ojszs3q.gkYRKS.R1gpY5Z9BPvWPaApjG/dqo8i1GoO9uO", role: "admin"}
  ])
}
