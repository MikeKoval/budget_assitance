import db from '../utils/db';

export async function list() {
  return [{id: 1, name: 'United States Dollar', shortName: 'USD'}];
  // return db
  //   .then(DB => DB.executeSql('SELECT * FROM currencies'))
  //   .then(results => results[0].rows.raw());
}