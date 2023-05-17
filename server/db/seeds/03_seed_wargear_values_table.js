/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('wargear_values').insert([
    {name: 'Incinerator'},
    {name: 'Nemesis daemon hammer'},
    {name: 'Psilencer'},
    {name: 'Psycannon'},
    {name: 'Combi-flamer'},
    {name: 'Combi-plasma'},
    {name: 'Combi-melta'},
    {name: 'Storm bolter'},
    {name: 'Dreadknight teleporter'},
    {name: 'Gatling psilencer'},
    {name: 'Heavy incinerator'},
    {name: 'Heavy psycannon'},
    {name: 'Nemesis daemon greathammer'},
    {name: 'Nemesis greatsword'},
    {name: 'Nemesis falchion'},
    {name: 'Heavy flamer'},
    {name: 'Multi-melta'},
    {name: 'Twin lascannon'},
    {name: 'Heavy bolter'},
    {name: 'Plasma cannon'},
    {name: 'Hunter-killer missile'},
    {name: 'Twin assault cannon'},
    {name: 'Las-talon'},
    {name: 'Typhoon missile launcher'},
    {name: 'Hurricane bolter'},
    {name: 'Twin multi-melta'},
    {name: 'Lascannon'},
  ]);
};
