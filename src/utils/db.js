import PouchDB from 'pouchdb-react-native';
const localDB = new PouchDB('docs');

// localDB.createIndex({
//   index: {
//     fields: ['entityType']
//   }
// }).then(console.log).catch(console.error);

// localDB.createIndex({
//   index: {
//     fields: ['entityType']
//   }
// });

export default localDB;
