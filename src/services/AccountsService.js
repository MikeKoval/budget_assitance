import db from '../utils/db';
import _ from 'lodash';
import TransactionsService from './TransactionsService';

export async function list() {
  return db.query(
    (doc) => {
      if (doc.entityType === 'account') {
        emit(doc);
      }
    },
    {include_docs : true}
    )
    .then(results => results.rows.map(row => row.doc))
    .then(accounts =>
      db.query(
        {
          map: (doc) => {
            if (doc.entityType === 'transaction') {
              emit(doc.accountId, {amount: doc.amount, type: doc.type});
            }
          },
          reduce: (keys, values) => {
            return values.reduce(
              (sum, n) => {
                return n.type === 1 ? sum - n.amount : sum + n.amount
              },
              0
            );
          }
        },
        {group: true}
      )
        .then(results => {
          return _.map(accounts, item => {
            const amountObj =  _.find(results.rows, {key: item._id});
            const transactions = +(amountObj && amountObj.value) || 0;
            item.amount = transactions + +item.initialValue;
            return item;
          });
        })
    );

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
  function map(doc) {
    if (doc.entityType === 'transaction') {
      emit(doc.accountId, doc);
    }
  }

  return db.get(id).then(function(doc) {
    return db.remove(doc)
      .then(() => TransactionsService.list(id))
      .then(transactions => _.map(item => {
        item._deleted = true;
        return item;
      }))
      .then(transactions => db.bulkDocs(transactions))
  });
  // return db
  //   .then(DB => DB.executeSql('DELETE FROM accounts WHERE id = ?', [id]))
  //   .then(results => results[0].rows.raw())
  //   .then(results => results && results[0])
}

