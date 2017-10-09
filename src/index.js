import './index.css';
import createWorker from './idb.worker';

const worker = createWorker();
worker.postMessage('hello');

document.getElementById('app').textContent = 'hello, app';

document.querySelector('button').addEventListener('click', () => {
  worker.postMessage('queryDB');
});
