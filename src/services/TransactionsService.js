import db from '../utils/db';

export async function list(accountId) {
  return db
    .then(DB => DB.executeSql(`
      SELECT 
        transactions.*,
        categories.name as category,
        accounts.name as account,
        currencies.shortName as currency
      FROM
        transactions 
        
        LEFT JOIN
          accounts
        ON
          accounts.id = transactions.accountId
        
        LEFT JOIN
          currencies
        ON
          currencies.id = accounts.currencyId
          
        LEFT JOIN
          categories
        ON
          categories.id = transactions.categoryId
    ` +
      (accountId ? 'WHERE transactions.accountId = ?' : '') +
    `
      ORDER BY 
        created DESC`, accountId ? [accountId] : []))
    .then(results => results[0].rows.raw());
}

export async function insert(item) {
  return db
    .then(DB =>
      DB.executeSql('INSERT INTO transactions(accountId, categoryId, place, created, note, amount, type) VALUES(?, ?, ?, ?, ?, ?, ?)', [
        item.accountId,
        item.categoryId,
        item.place,
        item.created,
        item.note,
        item.amount,
        item.type,
      ]))
    .then(results => results[0].rows.raw());
}

export async function getById(id) {
  return db
    .then(DB => DB.executeSql('SELECT * FROM transactions WHERE id = ?', [id]))
    .then(results => results[0].rows.raw())
    .then(results => results && results[0])
}

export async function update(item) {
  return db
    .then(DB =>
      DB.executeSql('UPDATE transactions SET accountId = ?, categoryId = ?, place = ?, created = ?, note = ?, amount = ?, type = ? WHERE id = ?', [
        item.accountId,
        item.categoryId,
        item.place,
        item.created,
        item.note,
        item.amount,
        item.type,
        item.id
      ]))
    .then(results => results[0].rows.raw());
}

export async function remove(id) {
  return db
    .then(DB => DB.executeSql('DELETE FROM transactions WHERE id = ?', [id]))
    .then(results => results[0].rows.raw())
    .then(results => results && results[0])
}
