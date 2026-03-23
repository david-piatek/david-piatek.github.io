const fs = require('fs');

const cvPath = 'data/cv.json';
const cv = JSON.parse(fs.readFileSync(cvPath, 'utf8'));

// 1. Créer un map "Mot Clé" -> "Type" basé sur la section skills existante
const keywordTypeMap = {};
if (cv.skills) {
    cv.skills.forEach(skillGroup => {
        if (skillGroup.keywords) {
            skillGroup.keywords.forEach(kw => {
                // On normalise en minuscule pour la recherche
                keywordTypeMap[kw.toLowerCase()] = skillGroup.name;
            });
        }
    });
}

// 2. Fonction de transformation d'un mot clé (string ou objet)
function transformKeyword(kw) {
    if (typeof kw === 'string') {
        const type = keywordTypeMap[kw.toLowerCase()] || 'Divers'; // Fallback si non trouvé
        return {
            "type": type,
            "global": kw,
            "precision": null,
            "important": false
        };
    }
    return kw; // Déjà un objet ou autre
}

// 3. Parcourir history pour transformer les keywords
if (cv.history) {
    cv.history.forEach(item => {
        if (item.keywords && Array.isArray(item.keywords)) {
            item.keywords = item.keywords.map(transformKeyword);
        }
    });
}

// 4. Sauvegarder
fs.writeFileSync(cvPath, JSON.stringify(cv, null, 4));
console.log('CV updated successfully');
