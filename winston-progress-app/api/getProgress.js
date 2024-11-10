import { readFile } from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
    try {
        const dataPath = path.join(process.cwd(), 'data.json');
        const data = await readFile(dataPath, 'utf-8');
        res.status(200).json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve progress' });
    }
}
