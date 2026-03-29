import fs from 'fs';
try {
    const buf = fs.readFileSync('src/data/grade6/questions100.txt');
    console.log(`Buffer length: ${buf.length}`);
    console.log('UTF-8:', buf.toString('utf8').slice(0, 100));
    console.log('UTF-16LE:', buf.toString('utf16le').slice(0, 100));
} catch (e) {
    console.error(e);
}
