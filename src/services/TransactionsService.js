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
      DB.executeSql('INSERT INTO transactions(accountId, categoryId, created, place, note, amount, type) VALUES(?, ?, DATETIME("now"), ?, ?, ?, ?)', [
        item.accountId,
        item.categoryId,
        item.place,
        item.note,
        item.amount,
        item.type,
      ]))
    .then(results => results[0].rows.raw());
}