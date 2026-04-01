const fs = require('fs');

const DIRS = ['උතුර','ඊසාන','නැගෙනහිර','ගිනිකොණ','දකුණ','නිරිත','බස්නාහිර','වයඹ'];
const ANIMALS = ['බල්ලා','පූසා','එළදෙන','එළුවා','අලියා','සිංහයා','කොටියා','වලහා','මුවා'];
const BIRDS = ['ගිරවා','මයිනා','කපුටා','කොකා','මොනරා','වළිකුකුළා','උකුස්සා','පරෙවියා'];
const FRUITS = ['අඹ','කෙසෙල්','පැපොල්','දොඩම්','ඇපල්','මිදි','පේර','රඹුටන්'];
const VEG = ['කැරට්','ගෝවා','වම්බටු','කරවිල','බෝංචි','වට්ටක්කා','පිපිඤ්ඤා'];
const COLORS = ['රතු','නිල්','කොළ','කහ','සුදු','කළු','රෝස','තැඹිලි'];

function getRandom(arr, count) {
    let copy = [...arr];
    copy.sort(() => Math.random() - 0.5);
    return copy.slice(0, count);
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let generated = new Set();
let idC = 6000;

function addQ(q, opts, ansStr, exp) {
    if(generated.has(q)) return null;
    generated.add(q);
    let options = [...opts];
    options.sort(() => Math.random() - 0.5);
    let ansIdx = options.indexOf(ansStr);
    return {
        id: idC++,
        subject: "G5",
        question: q,
        options: options,
        answer: ansIdx,
        explanation: exp
    };
}

function getGenerators() {
    return [
        () => {
            let a = randInt(100, 999);
            let b = randInt(10, 99);
            return addQ(`${a} සහ ${b} එකතුව කීයද?`, [`${a+b}`, `${a+b+10}`, `${a+b-10}`, `${a+b+1}`], `${a+b}`, `${a} + ${b} = ${a+b}`);
        },
        () => {
            let a = randInt(100, 999);
            let b = randInt(10, 99);
            return addQ(`${a} න් ${b} ක් අඩු කළ විට පිළිතුර කීයද?`, [`${a-b}`, `${a-b+10}`, `${a-b-10}`, `${a-b+1}`], `${a-b}`, `${a} - ${b} = ${a-b}`);
        },
        () => {
            let a = randInt(10, 50);
            let b = randInt(2, 9);
            return addQ(`${a} වරක් ${b} කීයද?`, [`${a*b}`, `${a*b+2}`, `${a*b-2}`, `${a*b+b}`], `${a*b}`, `${a} x ${b} = ${a*b}`);
        },
        () => {
            let a = randInt(5, 20) * 10;
            let b = randInt(1, a/10 - 1) * 10;
            return addQ(`රුපියල් ${a} කින් රුපියල් ${b} ක භාණ්ඩයක් මිලදී ගත් විට ඉතිරි මුදල කොපමණද?`, [`රුපියල් ${a-b}`, `රුපියල් ${a-b+10}`, `රුපියල් ${a-b-10}`, `රුපියල් ${a-b+5}`], `රුපියල් ${a-b}`, `${a} - ${b} = ${a-b}`);
        },
        () => {
            let start = randInt(1, 20);
            let diff = randInt(2, 5);
            let seq = [start, start+diff, start+diff*2, start+diff*3];
            let ans = start+diff*4;
            return addQ(`${seq.join(', ')}, ... මීළඟට එන සංඛ්‍යාව කුමක්ද?`, [`${ans}`, `${ans+1}`, `${ans-1}`, `${ans+diff}`], `${ans}`, `රටාවට අනුව ${diff} බැගින් වැඩි වේ.`);
        },
        () => {
            let cats = [ANIMALS, BIRDS, FRUITS, VEG, COLORS];
            cats.sort(() => Math.random() - 0.5);
            let catMain = cats[0];
            let catDiff = cats[1];
            let mOpts = getRandom(catMain, 3);
            let dOpt = getRandom(catDiff, 1)[0];
            return addQ(`පහත වචන අතරින් වෙනස් වචනය තෝරන්න: ${mOpts.join(', ')}, ${dOpt}`, [...mOpts, dOpt], dOpt, `${dOpt} අයත් වන්නේ වෙනත් කාණ්ඩයකටය.`);
        },
        () => {
            let h = randInt(1, 10);
            let m = randInt(1, 4) * 10;
            let addM = randInt(1, 3) * 10;
            let nh = h, nm = m + addM;
            if(nm >= 60) { nh++; nm -= 60; }
            let nmStr = nm === 0 ? '00' : nm;
            let mStr = m === 0 ? '00' : m;
            return addQ(`පෙ.ව. ${h}.${mStr} ට ආරම්භ වූ විභාගයක් මිනිත්තු ${addM} කින් අවසන් විය. විභාගය අවසන් වූ වෙලාව කුමක්ද?`, [`පෙ.ව. ${nh}.${nmStr}`, `පෙ.ව. ${nh+1}.${nmStr}`, `පෙ.ව. ${h}.${nmStr}`, `පෙ.ව. ${nh}.${(nm+10)%60}`], `පෙ.ව. ${nh}.${nmStr}`, `ආරම්භක වේලාවට මිනිත්තු ${addM} එකතු කළ විට පිළිතුර ලැබේ.`);
        },
        () => {
            let a = randInt(5, 15);
            let b = randInt(2, 8);
            return addQ(`පේළියක ගස් ${a} ක් සිටුවා ඇත. එවැනි පේළි ${b} ක ඇති මුළු ගස් ගණන කීයද?`, [`${a*b}`, `${a*b+a}`, `${a*b-a}`, `${a*b+2}`], `${a*b}`, `${a} x ${b} = ${a*b}`);
        },
        () => {
            let a = Math.pow(10, randInt(1, 3));
            let b = randInt(2, 9);
            return addQ(`${a} හි ${b} ගුණය කීයද?`, [`${a*b}`, `${a*b/10}`, `${a*b*10}`, `${a*b+10}`], `${a*b}`, `${a} x ${b} = ${a*b}`);
        },
        () => {
            let ans = randInt(5, 20);
            let b = randInt(2, 6);
            let q = ans * b;
            return addQ(`ළමුන් ${b} දෙනෙකුට රුපියල් ${q} ක් සමසේ බෙදා දුන් විට එක් අයෙකුට ලැබෙන මුදල කීයද?`, [`රු. ${ans}`, `රු. ${ans+2}`, `රු. ${ans-2}`, `රු. ${ans*2}`], `රු. ${ans}`, `${q} / ${b} = ${ans}`);
        }
    ];
}

for(let p = 4; p <= 40; p++) {
    let content = `export const grade5paper${p} = [\n`;
    let count = 0;
    while(count < 40) {
        let gens = getGenerators();
        let qObj = null;
        while(!qObj) {
            let g = gens[Math.floor(Math.random() * gens.length)];
            qObj = g();
        }
        content += `  { paperId: ${p}, id: ${qObj.id}, subject: 'G5', question: '${qObj.question}', options: ${JSON.stringify(qObj.options)}, answer: ${qObj.answer}, explanation: '${qObj.explanation}' },\n`;
        count++;
    }
    content += `];\n`;
    fs.writeFileSync(`src/data/grade5/grade5paper${p}.js`, content, 'utf8');
}
console.log('Done generating all grade 5 files.');
