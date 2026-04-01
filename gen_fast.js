const fs = require('fs');
let id = 6000;

for (let p = 4; p <= 40; p++) {
    let qlist = [];
    for (let i = 1; i <= 40; i++) {
        let type = i % 10;
        let qText = "";
        let opts = [];
        let ans = 0;
        let exp = "";
        
        let a = p * 10 + i;
        let b = (i + 5) * 2;
        
        if (type === 0) {
            qText = `${a} සහ ${b} එකතුව කීයද?`;
            opts = [`${a+b}`, `${a+b+10}`, `${a+b-5}`, `${a+b+1}`];
            ans = 0;
            exp = `${a} + ${b} = ${a+b}`;
        } else if (type === 1) {
            qText = `${a*3} න් ${b} ක් අඩු කළ විට පිළිතුර කීයද?`;
            opts = [`${a*3-b}`, `${a*3-b+10}`, `${a*3-b-5}`, `${a*3-b+2}`];
            ans = 0;
            exp = `${a*3} - ${b} = ${a*3-b}`;
        } else if (type === 2) {
            qText = `${b} වරක් ${type+2} කීයද?`;
            opts = [`${b*(type+2)}`, `${b+10}`, `${b*2}`, `${b*(type+1)}`];
            ans = 0;
            exp = `${b} x ${type+2} = ${b*(type+2)}`;
        } else if (type === 3) {
            qText = `රුපියල් ${a*10} කින් රුපියල් ${b*2} ක භාණ්ඩයක් මිලදී ගත් විට ඉතිරි මුදල කොපමණද?`;
            opts = [`රුපියල් ${a*10-b*2}`, `රුපියල් ${a*10-b*2+10}`, `රුපියල් ${a*10-b*2-10}`, `රුපියල් ${a*10}`];
            ans = 0;
            exp = `${a*10} - ${b*2} = ${a*10-b*2}`;
        } else if (type === 4) {
            let start = p + i;
            let diff = (i % 3) + 2;
            qText = `${start}, ${start+diff}, ${start+diff*2}, ${start+diff*3}, ... මීළඟට එන සංඛ්‍යාව කුමක්ද?`;
            opts = [`${start+diff*4}`, `${start+diff*4+1}`, `${start+diff*5}`, `${start+diff*3+1}`];
            ans = 0;
            exp = `රටාවට අනුව ${diff} බැගින් වැඩි වේ.`;
        } else if (type === 5) {
            let mOpts = ["අඹ", "කෙසෙල්", "පැපොල්", "දොඩම්"];
            let dOpt = "ගෝවා";
            if (i % 2 === 0) {
                mOpts = ["බල්ලා", "පූසා", "එළදෙන", "අලියා"];
                dOpt = "කපුටා";
            }
            qText = `පහත වචන අතරින් වෙනස් වචනය තෝරන්න (අංක ${a}): ${mOpts.join(', ')}, ${dOpt}`;
            opts = [dOpt, mOpts[0], mOpts[1], mOpts[2]];
            ans = 0;
            exp = `${dOpt} අයත් වන්නේ වෙනත් කාණ්ඩයකටය.`;
        } else if (type === 6) {
            qText = `දිනකට පැය කීයක් තිබේද? (අංක ${a} - ${b})`;
            opts = ["24", "12", "60", "48"];
            ans = 0;
            exp = "දිනකට පැය 24 කි.";
        } else if (type === 7) {
            let h = (p % 10) + 1;
            let addM = b;
            qText = `පෙ.ව. ${h}.00 ට ආරම්භ වූ විභාගයක් මිනිත්තු ${addM} කින් අවසන් විය. විභාගය අවසන් වූ වෙලාව කුමක්ද?`;
            opts = [`පෙ.ව. ${h}.${addM<10?'0'+addM:addM}`, `පෙ.ව. ${h+1}.00`, `පෙ.ව. ${h}.${addM+10}`, `පෙ.ව. ${h-1}.30`];
            ans = 0;
            exp = `මිනිත්තු ${addM} ක් එකතු විය.`;
        } else if (type === 8) {
            qText = `පේළියක ගස් ${p} ක් සිටුවා ඇත. එවැනි පේළි ${i} ක ඇති මුළු ගස් ගණන කීයද?`;
            opts = [`${p*i}`, `${p*i+10}`, `${p*(i-1)}`, `${(p-1)*i}`];
            ans = 0;
            exp = `${p} x ${i} = ${p*i}`;
        } else if (type === 9) {
            qText = `ළමුන් ${type+2+i%3} දෙනෙකුට රුපියල් ${a*(type+2+i%3)} ක් සමසේ බෙදා දුන් විට එක් අයෙකුට ලැබෙන මුදල කීයද?`;
            opts = [`රු. ${a}`, `රු. ${a+5}`, `රු. ${a*2}`, `රු. ${a-5}`];
            ans = 0;
            exp = `${a*(type+2+i%3)} / ${type+2+i%3} = ${a}`;
        }

        qlist.push({
            paperId: p,
            id: id++,
            subject: "G5",
            question: qText,
            options: opts,
            answer: ans,
            explanation: exp
        });
    }
    
    let content = `export const grade5paper${p} = [\n`;
    for(let qObj of qlist) {
        let correctOpt = qObj.options[qObj.answer];
        let shuffledOpts = [...qObj.options];
        shuffledOpts.sort(() => Math.random() - 0.5);
        let newAns = shuffledOpts.indexOf(correctOpt);
        
        content += `  { "paperId": ${qObj.paperId}, "id": ${qObj.id}, "subject": "${qObj.subject}", "question": "${qObj.question}", "options": ${JSON.stringify(shuffledOpts)}, "answer": ${newAns}, "explanation": "${qObj.explanation}" },\n`;
    }
    content += `];\n`;
    fs.writeFileSync(`src/data/grade5/grade5paper${p}.js`, content, 'utf8');
}
console.log('All files saved!');
