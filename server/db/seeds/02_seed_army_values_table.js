/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('army_values').del();
  
  await knex('army_values').insert([
    {name: 'Brother-Captain', class: 'HQ', unit_size: '1', cost_per_unit: '95'},
    {name: 'Brother-Captain Stern', class: 'HQ', unit_size: '1', cost_per_unit: '110'},
    {name: 'Brotherhood Champion', class: 'HQ', unit_size: '1', cost_per_unit: '85'},
    {name: 'Brotherhood Chaplain', class: 'HQ', unit_size: '1', cost_per_unit: '90'},
    {name: 'Brotherhood Librarian', class: 'HQ', unit_size: '1', cost_per_unit: '110'},
    {name: 'Brotherhood Techmarine', class: 'HQ', unit_size: '1', cost_per_unit: '85'},
    {name: 'Castellan Crowe', class: 'HQ', unit_size: '1', cost_per_unit: '95'},
    {name: 'Grand Master', class: 'HQ', unit_size: '1', cost_per_unit: '115'},
    {name: 'Grand Master in Nemesis Dreadknight', class: 'HQ', unit_size: '1', cost_per_unit: '245'},
    {name: 'Grand Master Voldus', class: 'HQ', unit_size: '1', cost_per_unit: '115'},
    {name: 'Kaldor Draigo', class: 'HQ', unit_size: '1', cost_per_unit: '155'},
    {name: 'Brotherhood Terminator Squad', class: 'Troops', unit_size: '5-10', cost_per_unit: '45'},
    {name: 'Strike Squad', class: 'Troops', unit_size: '5-10', cost_per_unit: '27'},
    {name: 'Paladin Squad', class: 'Elites', unit_size: '5-10', cost_per_unit: '51'},
    {name: 'Purifier Squad', class: 'Elites', unit_size: '5-10', cost_per_unit: '30'},
    {name: 'Venerable Dreadnought', class: 'Elites', unit_size: '1', cost_per_unit: '155'},
    {name: 'Interceptor Squad', class: 'Fast Attack', unit_size: '5-10', cost_per_unit: '32'},
    {name: 'Land Raider', class: 'Heavy Support', unit_size: '1', cost_per_unit: '270'},
    {name: 'Land Raider Crusader', class: 'Heavy Support', unit_size: '1', cost_per_unit: '250'},
    {name: 'Land Raider Redeemer', class: 'Heavy Support', unit_size: '1', cost_per_unit: '290'},
    {name: 'Nemesis Dreadknight', class: 'Heavy Support', unit_size: '1', cost_per_unit: '215'},
    {name: 'Purgation Squad', class: 'Heavy Support', unit_size: '5-10', cost_per_unit: '27'},
    {name: 'Razorback', class: 'Dedicated Transports', unit_size: '1', cost_per_unit: '95'},
    {name: 'Rhino', class: 'Dedicated Transports', unit_size: '1', cost_per_unit: '80'},
    {name: 'Stormhawk Interceptor', class: 'Flyers', unit_size: '1', cost_per_unit: '160'},
    {name: 'Stormraven Gunship', class: 'Flyers', unit_size: '1', cost_per_unit: '265'},
    {name: 'Stormtalon Gunship', class: 'Flyers', unit_size: '1', cost_per_unit: '170'},
  ]);
};
