/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('army_values').insert([
    {name: 'Brother-Captain', class: 'HQ', unit_size: '1'},
    {name: 'Brother-Captain Stern', class: 'HQ', unit_size: '1'},
    {name: 'Brotherhood Champion', class: 'HQ', unit_size: '1'},
    {name: 'Brotherhood Chaplain', class: 'HQ', unit_size: '1'},
    {name: 'Brotherhood Librarian', class: 'HQ', unit_size: '1'},
    {name: 'Brotherhood Techmarine', class: 'HQ', unit_size: '1'},
    {name: 'Castellan Crowe', class: 'HQ', unit_size: '1'},
    {name: 'Grand Master', class: 'HQ', unit_size: '1'},
    {name: 'Grand Master in Nemesis Dreadknight', class: 'HQ', unit_size: '1'},
    {name: 'Grand Master Voldus', class: 'HQ', unit_size: '1'},
    {name: 'Kaldor Draigo', class: 'HQ', unit_size: '1'},
    {name: 'Brotherhood Terminator Squad', class: 'Troops', unit_size: '5-10'},
    {name: 'Strike Squad', class: 'Troops', unit_size: '5-10'},
    {name: 'Paladin Squad', class: 'Elites', unit_size: '5-10'},
    {name: 'Purifier Squad', class: 'Elites', unit_size: '5-10'},
    {name: 'Venerable Dreadnought', class: 'Elites', unit_size: '1'},
    {name: 'Interceptor Squad', class: 'Fast Attack', unit_size: '5-10'},
    {name: 'Land Raider', class: 'Heavy Support', unit_size: '1'},
    {name: 'Land Raider Crusader', class: 'Heavy Support', unit_size: '1'},
    {name: 'Land Raider Redeemer', class: 'Heavy Support', unit_size: '1'},
    {name: 'Nemesis Dreadknight', class: 'Heavy Support', unit_size: '1'},
    {name: 'Purgation Squad', class: 'Heavy Support', unit_size: '5-10'},
    {name: 'Razorback', class: 'Dedicated Transports', unit_size: '1'},
    {name: 'Rhino', class: 'Dedicated Transports', unit_size: '1'},
    {name: 'Stormhawk Interceptor', class: 'Flyers', unit_size: '1'},
    {name: 'Stormraven Gunship', class: 'Flyers', unit_size: '1'},
    {name: 'Stormtalon Interceptor', class: 'Flyers', unit_size: '1'},
  ]);
};
