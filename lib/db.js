import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

export function getJSON(filename) {
    const filePath = path.join(dataDir, filename);
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
}

export function saveJSON(filename, data) {
    const filePath = path.join(dataDir, filename);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}
