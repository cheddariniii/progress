import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method Not Allowed');
    }

    const { action } = req.body;
    if (!action || !['feed', 'pet', 'scare'].includes(action)) {
        return res.status(400).json({ error: 'Invalid action' });
    }

    try {
        const dataPath = path.join(process.cwd(), 'data.json');
        const data = JSON.parse(await readFile(dataPath, 'utf-8'));

        // Update the specified progress value
        data[action] = Math.max(data[action] - 10, 0);
        await writeFile(dataPath, JSON.stringify(data, null, 2));

        res.status(200).json({ message: `${action} progress updated`, progress: data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update progress' });
    }
}
