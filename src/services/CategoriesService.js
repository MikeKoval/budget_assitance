import db from '../utils/db';

export async function list() {
  return db
    .then(DB => DB.executeSql('SELECT * FROM categories ORDER BY name'))
    .then(results => results[0].rows.raw());
}

export async function insert(item) {
  return db
    .then(DB =>
      DB.executeSql('INSERT INTO categories(name, parentId, type) VALUES(?, ?, ?)', [
        item.name,
        item.parentId,
        item.type
      ]))
    .then(results => results[0].rows.raw());
}

export async function getById(id) {
  return db
    .then(DB => DB.executeSql('SELECT * FROM categories WHERE id = ?', [id]))
    .then(results => results[0].rows.raw())
    .then(results => results && results[0])
}

export async function update(item) {
  return db
    .then(DB =>
      DB.executeSql('UPDATE categories SET name = ?, parentId = ?, type = ? WHERE id = ?', [
        item.name,
        item.parentId,
        item.type,
        item.id
      ]))
    .then(results => results[0].rows.raw());
}