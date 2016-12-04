import db from '../utils/db';

export async function list() {
  return db
    .then(DB => DB.executeSql('SELECT * FROM transactions ORDER BY created DESC'))
    .then(results => results[0].rows.raw());
}

export async function insert(item) {
  return db
    .then(DB =>
      DB.executeSql('INSERT INTO transactions(accountId, categoryId, created, place, note) VALUES(?, ?, ?, ?, ?)', [
        item.accountId,
        item.categoryId,
        item.created,
        item.place,
        item.note,
      ]))
    .then(results => results[0].rows.raw());
}