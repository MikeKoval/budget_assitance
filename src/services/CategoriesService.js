import db from '../utils/db';

export async function list(type) {
  function map(doc) {
    if (doc.entityType === 'category') {
      emit(doc.type, doc);
    }
  }

  const params = {include_docs : true};
  if(type) params.key = type;

  return db
    .query(map, params)
    .then(results => results.rows.map(row => row.doc));
  // return db
  //   .then(DB => DB.executeSql('SELECT * FROM categories ' + (type ? 'WHERE type = ?' : '') +' ORDER BY name', type ? [type]: []))
  //   .then(results => results[0].rows.raw());
}

export async function insert(item) {
  // console.log('---item', item);
  item.entityType = 'category';
  return db.post(item);
  // return db
  //   .then(DB =>
  //     DB.executeSql('INSERT INTO categories(name, parentId, type) VALUES(?, ?, ?)', [
  //       item.name,
  //       item.parentId,
  //       item.type
  //     ]))
  //   .then(results => results[0].rows.raw());
}

export async function getById(id) {
  return db.get(id);
  // return db
  //   .then(DB => DB.executeSql('SELECT * FROM categories WHERE id = ?', [id]))
  //   .then(results => results[0].rows.raw())
  //   .then(results => results && results[0])
}

export async function update(item) {
  db.get(item._id).then(function(doc) {
    console.log('---doc');
    return db.put({
      _rev: doc._rev,
      ...item
    });
  });
  // return db
  //   .then(DB =>
  //     DB.executeSql('UPDATE categories SET name = ?, parentId = ?, type = ? WHERE id = ?', [
  //       item.name,
  //       item.parentId,
  //       item.type,
  //       item.id
  //     ]))
  //   .then(results => results[0].rows.raw());
}