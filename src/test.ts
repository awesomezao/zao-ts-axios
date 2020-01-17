import { get, post } from './axios/index';

let buttonA = document.getElementById('get');
let buttonB = document.getElementById('post');

buttonA?.addEventListener('click', () => {
  get('/nm', '1235645312', { cache: true })
    .then(s => {
      console.log(s);
    })
    .catch(err => {
      console.log(err);
    });
});

buttonB?.addEventListener('click', () => {
  post('/', { a: '132', b: '32' }, { isJson: true, cache: true })
    .then(s => {
      console.log(s);
    })
    .catch(err => {
      console.log(err);
    });
});
