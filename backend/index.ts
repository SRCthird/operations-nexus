import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 5000;
const STATIC_DIR = path.join(__dirname, 'static');

type Display = {
    ID: number;
    Main: string;
    Sub: string;
    Department: string;
    Display: string;
    Background: string;
};

app.use('/static/main', express.static(path.join(STATIC_DIR, 'main')));
app.use('/static/ssc', express.static(path.join(STATIC_DIR, 'ssc')));
app.use('/static', express.static(STATIC_DIR));

function slides(req: Request, res: Response, location: string) {
    const dir = path.join(STATIC_DIR, location);
    fs.readdir(dir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read directory' });
        }
        
        const imageFiles = files.filter(file => file.toLowerCase().endsWith('.png'))
                                .map(file => path.join(location, file));
        res.json(imageFiles);
    });
}

app.get('/api/MainSlides', (req: Request, res: Response) => {
    slides(req, res, 'main');
});

app.get('/api/SSC', (req: Request, res: Response) => {
    slides(req, res, 'ssc');
});

app.get('/api/delay', (req: Request, res: Response) => {
    const delay = 30 * 1000; // 30 seconds
    res.json(delay);
});

app.get('/api/display', (req: Request, res: Response) => {
    // TODO Impliment displays output
});

app.get('/api/departments', (req: Request, res: Response) => {
    // TODO Impliment departments output
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
