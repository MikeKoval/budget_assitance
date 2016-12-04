import db from '../utils/db';

export async function list() {
  return db
    .then(DB => DB.executeSql('SELECT * FROM categories ORDER BY name'))
    .then(results => results[0].rows.raw());
}

// export async function insert(item) {
//   return db
//     .then(DB =>
//       DB.executeSql('INSERT INTO accounts(name, initialValue, color, currencyId) VALUES(?, ?, ?, ?)', [
//         item.name,
//         item.initialValue,
//         item.color,
//         item.currencyId
//       ]))
//     .then(results => results[0].rows.raw());
// }