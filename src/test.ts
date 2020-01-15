import {get} from './axios/index'

let buttonA = document.getElementById('get')

let data = get('/','1235645312').then(s=>{console.log(s)
})
buttonA?.addEventListener('click', () => {
    get('/', '1235645312').then(s => {
      console.log(s);
    });
})
console.log(data)
