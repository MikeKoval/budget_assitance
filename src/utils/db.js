import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

export default SQLite.openDatabase({name: 'db', createFromLocation: '~db.sqlite'});
