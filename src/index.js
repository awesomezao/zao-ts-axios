import axios from 'axios'


let sdata = 0
let fdata = 0

axios.get('/api').then(s => {
  sdata = s
  console.log(s.data)
  
}).catch(f => {
  fdata=f
})

console.log(sdata);
