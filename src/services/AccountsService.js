import db from '../utils/db';

export async function list() {
  return db
    .then(DB => DB.executeSql('SELECT * FROM Artist', []))
    .then(results => results[0].rows.raw());
}

export async function insert(item) {
  console.log('---item', item);
  return db
    .then(DB => DB.executeSql('INSERT INTO Artist(Name) VALUES(:value)', [item.get('Name')]))
    .then(results => results[0].rows.raw());
}