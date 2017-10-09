import Dexie from 'dexie';

const DB_NAME = 'SOMEDB';

const DB_SCHEME = {
  someItems: 'id',
};

const db = new Dexie(DB_NAME);

db.version(1).stores(DB_SCHEME);

self.onmessage = function(e) {
  if (e.data === 'hello') {
    console.log('hello in worker');
  }

  if (e.data === 'queryDB') {
    console.log('isOpen', db.isOpen());
    db.someItems.toArray(); // this line crashes safari 10
    console.log('did not crash');
  }
};
