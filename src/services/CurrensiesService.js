// import db from '../utils/db';

export async function list() {
  return [
    {id: 1, name: 'United States Dollar', shortName: 'USD'},
    {id: 2, name: 'Russian Ruble', shortName: 'RUB'},
    {id: 3, name: 'Polish Zloty', shortName: 'PLN'},
    {id: 4, name: 'Ukrainian Hryvnia', shortName: 'UAH'},
  ];

  // return db
  //   .then(DB => DB.executeSql('SELECT * FROM currencies'))
  //   .then(results => results[0].rows.raw());
}