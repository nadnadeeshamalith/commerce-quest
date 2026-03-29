import fs from 'fs';
const buf = fs.readFileSync('src/data/grade6/questions100.txt');
console.log(buf.slice(0, 50).toString('hex'));
