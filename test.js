const fs = require('fs');

let idx,
    ast,
    cnm,
    assets;


function error(err) {
    console.error(err);
    process.exit(1);
}


// Attempt to open the index.html file:
try {
    idx = fs.readFileSync('dist/index.html', 'utf8');
} catch (err) {
    error(err);
}


// Attempt to open the assets.json file:
try {
    ast = fs.readFileSync('dist/assets.json', 'utf8');
} catch (err) {
    error(err);
}

// Attempt to open the CNAME file:
try {
    cnm = fs.readFileSync('dist/CNAME', 'utf8');
} catch (err) {
    error(err);
}

// Parse JSON:
try {
    assets = JSON.parse(ast);
} catch (err) {
    error(err);
}

// Check each asset has been replaced in the index.html file:
Object.keys(assets).forEach(function(key) {
    if (key !== 'preload.css' && !idx.includes(assets[key])) {
        error('Asset ' + assets[key] + ' not found.');
    }
});

// Exit successfully:
process.exit(0);
