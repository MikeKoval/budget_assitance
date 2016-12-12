import db from '../utils/db';
import _ from 'lodash';
import {list as listAccounts} from './AccountsService';
import {list as listCategories} from './CategoriesService';

export async function list(accountId) {
  function map(doc) {
    if (doc.entityType === 'transaction') {
      emit(doc.accountId, doc);
    }
  }

  const params = {include_docs : true};
  if (accountId) {
    params.key = accountId;
  }

  return db
    .query(map, params)
    .then(results => results.rows.map(row => row.doc))
    .then(transactions =>
      listAccounts()
        .then(accounts =>
          _.map(transactions, item => {
            item.account = _.find(accounts, {_id: item.accountId});
            return item;
          })
        )
        .then(transactions =>
          listCategories()
            .then(categories =>
              _.map(transactions, item => {
                item.category = _.find(categories, {_id: item.categoryId});
                return item;
              })
            )
        )
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
