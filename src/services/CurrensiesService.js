import db from '../utils/db';

export async function list() {
  return db
    .then(DB => DB.executeSql('SELECT * FROM currencies'))
    .then(results => results[0].rows.raw());
}