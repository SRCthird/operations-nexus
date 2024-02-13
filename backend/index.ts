import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import * as departments from './src/departments.json';
import * as displaysJSON from './src/display.json';
import bodyParser from 'body-parser';

// Declare application variables
const app = express();
const PORT = 5000;
const STATIC_DIR = path.join(__dirname, 'static');

/**
 * Represents the Display object that will be returned to the client.
 * @param {number} ID - The ID of the display.
 * @param {string} Main - Main branch of the department.
 * @param {string} Sub - Department name of the display.
 * @param {string} Department - Child department of the display.
 * @param {string} Display - Name of the display.
 * @param {string} Background - Background Image of the display. (link to image)
 */
interface Display {
    /**
     * ID of the display.
     */
    ID: number;
    /**
     * Main branch of the department.
     */
    Main: string;
    /**
     * Department name of the display.
     */
    Sub: string;
    /**
     * Child department of the display.
     */
    Department: string;
    /**
     * Name of the display.
     */
    Display: string;
    /**
     * Background Image of the display. (link to image)
     */
    Background: string;
};

/**
 * Return the list of PNG converted PowerPoint files in the source location specified by `location`.
 *
 * @param {Request} req - The HTTP request object sent to the API.
 * @param {Response} res - The HTTP response object used to reply to the client.
 * @param {string} location - The name of the subfolder under "static".
 * @returns {void} - This function processes the response but does not return anything.
 */
const slides = (req: Request, res: Response, location: string): void => {
    const dir = path.join(STATIC_DIR, location);
    const readDirectory = () => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read directory' });
            }

            const imageFiles = files.filter(file => file.toLowerCase().endsWith('.png'))
            .map(file => path.join(location, file));
            res.json(imageFiles);
        });
    }

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(dir)) {
        fs.mkdir(dir, { recursive: true }, (mkdirErr) => {
            if (mkdirErr) {
                return res.status(500).json({ error: 'Failed to create directory' });
            }
            // Directory created or exists, now continue with readdir
            readDirectory();
        });
    } else {
        readDirectory();
    }
}

// Setting static routes
departments.departments.forEach(department => {
    const departmentPath = department.Department.replace(/\s+/g, '-');
    app.use(`/static/${departmentPath}`, express.static(path.join(STATIC_DIR, departmentPath)));
    app.get(`/api/${departmentPath}`, (req: Request, res: Response) => {
        slides(req, res, departmentPath);
    });
});
app.use('/static/main', express.static(path.join(STATIC_DIR, 'main')));
app.use('/static', express.static(STATIC_DIR));
app.use(bodyParser.json());

app.get('/api/MainSlides', (req: Request, res: Response) => {
    slides(req, res, 'main');
});


// TODO: Make a more suitable place to hold the delay option for response
app.get('/api/delay', (req: Request, res: Response) => {
    const delay = 30 * 1000; // 30 seconds
    res.json(delay);
});

app.get('/api/display', (req: Request, res: Response) => {
    let displays: Display[] = displaysJSON.displays;
    
    const queryParameters = req.query;

    if ('departments' in queryParameters) {
        const selectedDepartment = queryParameters['departments'] as string;
        displays = displays.filter(display => display['Department'] === selectedDepartment);
    }

    if ('search' in queryParameters) {
        const searchQuery = (queryParameters['search'] as string).toLowerCase();
        displays = displays.filter(display => 
            display['Main'].toLowerCase().includes(searchQuery) ||
            display['Sub'].toLowerCase().includes(searchQuery) ||
            display['Department'].toLowerCase().includes(searchQuery) ||
            display['Display'].toLowerCase().includes(searchQuery)
        );
    }
    res.json(displays);
});

app.get('/api/departments', (req: Request, res: Response) => {
    res.json(departments.departments);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
