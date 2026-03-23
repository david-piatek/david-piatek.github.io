const fs = require('fs');
const cvPath = 'data/cv.json';
const cv = JSON.parse(fs.readFileSync(cvPath, 'utf8'));

if (cv.history) {
    cv.history.forEach(item => {
        if (item.keywords) {
            item.skills = item.keywords;
            delete item.keywords;
        }
    });
}

fs.writeFileSync(cvPath, JSON.stringify(cv, null, 4));
console.log('Renamed keywords to skills in history');
