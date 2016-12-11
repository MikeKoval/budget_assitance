import db from '../utils/db';

export async function list() {
  function map(doc) {
    // join artist data to albums
    if (doc.entityType === 'account') {
      emit(doc);
    }
  }

  return db.query(map, {include_docs : true})
    .then(results => results.rows.map(row => row.doc));

  // return db.allDocs({include_docs: true})
  //   .then(results => results.rows.map(row => row.doc));
  // return db
  //   .then(DB => DB.executeSql(`
  //     SELECT
  //       accounts.*,
  //       currencies.shortName as currency,
  //       accounts.initialValue +
  //       (SELECT IFNULL(SUM(transactions.amount), 0) FROM transactions WHERE isTransfer = 1 AND targetAccountId = accounts.id) -
  //       (SELECT IFNULL(SUM(transactions.amount), 0) FROM transactions WHERE isTransfer = 1 AND accountId = accounts.id) AS amount
  //
  //     FROM
  //       accounts
  //
  //       LEFT JOIN
  //         currencies
  //       WHERE
  //         currencies.id = accounts.currencyId
  //   `))
  //   .then(results => results[0].rows.raw());
  // return db
  //   .then(DB => DB.executeSql(`
  //     SELECT
  //       accounts.*,
  //       currencies.shortName as currency,
  //       accounts.initialValue +
  //       (SELECT IFNULL(SUM(transactions.amount), 0) FROM transactions WHERE type = 1 AND targetAccountId = accounts.id) -
  //       (SELECT IFNULL(SUM(transactions.amount), 0) FROM transactions WHERE type = 1 AND accountId = accounts.id) AS amount
  //
  //     FROM
  //       accounts
  //
  //       LEFT JOIN
  //         currencies
  //       WHERE
  //         currencies.id = accounts.currencyId
  //   `))
  //   .then(results => results[0].rows.raw());
}

export async function insert(item) {
  item.entityType = 'account';
  return db.post(item);
  // return db
  //   .then(DB =>
  //     DB.executeSql('INSERT INTO accounts(name, initialValue, color, currencyId) VALUES(?, ?, ?, ?)', [
  //       item.name,
  //       item.initialValue,
  //       item.color,
  //       item.currencyId
  //     ]))
  //   .then(results => results[0].rows.raw());
}

export async function getById(id) {
  return db.get(id);
  // return db
  //   .then(DB => DB.executeSql('SELECT * FROM accounts WHERE id = ?', [id]))
  //   .then(results => results[0].rows.raw())
  //   .then(results => results && results[0])
}

export async function update(item) {
  db.get(item._id).then(function(doc) {
    return db.put({
      _rev: doc._rev,
      ...item
    });
  });

  // return db
  //   .then(DB =>
  //     DB.executeSql('UPDATE accounts SET name = ?, initialValue = ?, color = ?, currencyId = ? WHERE id = ?', [
  //       item.name,
  //       item.initialValue,
  //       item.color,
  //       item.currencyId,
  //       item.id
  //     ]))
  //   .then(results => results[0].rows.raw());
}

export async function remove(id) {
  return db.get(id).then(function(doc) {
    return db.remove(doc);
  });
  // return db
  //   .then(DB => DB.executeSql('DELETE FROM accounts WHERE id = ?', [id]))
  //   .then(results => results[0].rows.raw())
  //   .then(results => results && results[0])
}

