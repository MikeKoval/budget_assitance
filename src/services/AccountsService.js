import db from '../utils/db';

export async function list() {
  return db
    .then(DB => DB.executeSql('SELECT * FROM accounts'))
    .then(results => results[0].rows.raw());
}

export async function insert(item) {
  return db
    .then(DB =>
      DB.executeSql('INSERT INTO accounts(name, initialValue, color, currencyId) VALUES(?, ?, ?, ?)', [
        item.name,
        item.initialValue,
        item.color,
        item.currencyId
      ]))
    .then(results => results[0].rows.raw());
}

export async function getById(id) {
  return db
    .then(DB => DB.executeSql('SELECT * FROM accounts WHERE id = ?', [id]))
    .then(results => results[0].rows.raw())
    .then(results => results && results[0])
}

export async function update(item) {
  return db
    .then(DB =>
      DB.executeSql('UPDATE accounts SET name = ?, initialValue = ?, color = ?, currencyId = ? WHERE id = ?', [
        item.name,
        item.initialValue,
        item.color,
        item.currencyId,
        item.id
      ]))
    .then(results => results[0].rows.raw());
}
