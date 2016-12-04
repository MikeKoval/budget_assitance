import db from '../utils/db';

export async function list() {
  return db
    .then(DB => DB.executeSql(`
      SELECT
        accounts.*,
        currencies.shortName as currency,
        accounts.initialValue +
        (SELECT IFNULL(SUM(transactions.amount), 0) FROM transactions WHERE isTransfer = 1 AND targetAccountId = accounts.id) -
        (SELECT IFNULL(SUM(transactions.amount), 0) FROM transactions WHERE isTransfer = 1 AND accountId = accounts.id) AS amount 
      
      FROM 
        accounts
        
        LEFT JOIN
          currencies
        WHERE
          currencies.id = accounts.currencyId
    `))
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

export async function remove(id) {
  return db
    .then(DB => DB.executeSql('DELETE FROM accounts WHERE id = ?', [id]))
    .then(results => results[0].rows.raw())
    .then(results => results && results[0])
}

