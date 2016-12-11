import db from '../utils/db';
import _ from 'lodash';

export async function list(accountId) {
  function map(doc) {
    if (doc.entityType === 'transaction') {
      emit([doc.accountId, 'transaction'], doc);
    }
    if (doc.entityType === 'account') {
      emit([doc._id, 'account'], doc);
    }
  }

  const params = {include_docs : true};
  if (accountId) {
    // params.startkey = [accountId];
    // params.endkey = [accountId];
  }

  return db
    .query(map, params)
    .then(results => {
      return results.rows.map(row => row.doc);
    })
    .then(results =>
      _.filter(_.map(results, item => {
        if (item.entityType === 'transaction') {
          const account = _.find(results, {_id: item.accountId});
          item.account = account && account.name;
        }

        return item;
      }), item => item.entityType === 'transaction')
    );
  // return db
  //   .then(DB => DB.executeSql(`
  //     SELECT
  //       transactions.*,
  //       categories.name as category,
  //       accounts.name as account,
  //       currencies.shortName as currency
  //     FROM
  //       transactions
  //
  //       LEFT JOIN
  //         accounts
  //       ON
  //         accounts.id = transactions.accountId
  //
  //       LEFT JOIN
  //         currencies
  //       ON
  //         currencies.id = accounts.currencyId
  //
  //       LEFT JOIN
  //         categories
  //       ON
  //         categories.id = transactions.categoryId
  //   ` +
  //     (accountId ? 'WHERE transactions.accountId = ?' : '') +
  //   `
  //     ORDER BY
  //       created DESC`, accountId ? [accountId] : []))
  //   .then(results => results[0].rows.raw());
}

export async function insert(item) {
  item.entityType = 'transaction';
  return db.post(item);
  // return db
  //   .then(DB =>
  //     DB.executeSql('INSERT INTO transactions(accountId, categoryId, place, created, note, amount, type) VALUES(?, ?, ?, ?, ?, ?, ?)', [
  //       item.accountId,
  //       item.categoryId,
  //       item.place,
  //       item.created,
  //       item.note,
  //       item.amount,
  //       item.type,
  //     ]))
  //   .then(results => results[0].rows.raw());
}

export async function getById(id) {
  return db.get(id);
  // return db
  //   .then(DB => DB.executeSql('SELECT * FROM transactions WHERE id = ?', [id]))
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
  //     DB.executeSql('UPDATE transactions SET accountId = ?, categoryId = ?, place = ?, created = ?, note = ?, amount = ?, type = ? WHERE id = ?', [
  //       item.accountId,
  //       item.categoryId,
  //       item.place,
  //       item.created,
  //       item.note,
  //       item.amount,
  //       item.type,
  //       item.id
  //     ]))
  //   .then(results => results[0].rows.raw());
}

export async function remove(id) {
  return db.get(id).then(function(doc) {
    return db.remove(doc);
  });
  // return db
  //   .then(DB => DB.executeSql('DELETE FROM transactions WHERE id = ?', [id]))
  //   .then(results => results[0].rows.raw())
  //   .then(results => results && results[0])
}
